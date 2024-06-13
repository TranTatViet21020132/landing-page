import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as otpGenerator from 'otp-generator';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { Limit, sendMailOptions } from './types';
import { Status } from '@prisma/client';
import { CheckValidOtp } from './dto/checkValidOtp.dto';

@Injectable()
export class RegisterService {
  constructor(
    private prismaService: PrismaService,
    private mailerService: MailerService,
  ) {}

  async registerAccount(registerDto: RegisterDto) {
    try {
      const { email } = registerDto;

      let customerExists = await this.prismaService.customer.findUnique({
        where: {
          email: email,
        },
      });

      if (customerExists) {
        throw new HttpException(
          'Khách hàng không tồn tại',
          HttpStatus.BAD_REQUEST,
        );
      }

      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: true,
      });

      const hashOtp = await this.hashData(otp);

      const newCustomer = await this.prismaService.customer.create({
        data: {
          email: email,
          otp: hashOtp,
          attempts: 0,
          personal_income: 0,
          status: 'ACTIVE',
        },
      });

      const sendMailOptions: sendMailOptions = {
        to: email,
        subject: '[Loan Service]',
        displayName: 'Customer',
        otp: otp,
        type: 'confirm',
      };

      await this.mailerService.sendMail(sendMailOptions);
      return newCustomer;
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.BAD_REQUEST);
    }
  }

  async checkValidOtp(data: CheckValidOtp) {
    try {
      const { email, otp } = data;
      const customer = await this.prismaService.customer.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          otp: true,
          status: true,
          attempts: true,
          is_verify_otp: true,
          updated_at: true,
        },
      });

      if (!customer) {
        throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
      }

      if (customer.is_verify_otp) {
        throw new HttpException(
          'Tài khoản của bạn đã xác thực! Vui lòng đến bước tiếp theo',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (customer.status === Status.BLOCKED) {
        const timeBlock = new Date(customer.updated_at);
        const unblockTime = new Date(timeBlock.getTime() + 60000 * 10); // unlock after 10 minute
        const currentTime = new Date();

        if (unblockTime <= currentTime) {
          await this.prismaService.customer.update({
            where: { email },
            data: {
              status: Status.ACTIVE,
            },
          });
        } else {
          throw new HttpException(
            'Tài khoản của bạn đã bị khóa',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const isOtpValid = await this.verifyHash(customer.otp, otp);

      if (!isOtpValid) {
        const updatedCustomer = await this.prismaService.customer.update({
          where: {
            email,
          },
          data: {
            attempts: customer.attempts + 1,
          },
        });

        if (updatedCustomer.attempts >= Limit.MAX_ATTEMPTS) {
          await this.prismaService.customer.update({
            where: {
              email,
            },
            data: {
              status: Status.BLOCKED,
            },
          });
          throw new HttpException(
            'Tài khoản của bạn đã bị khóa',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException(
          `OTP không đúng, bạn còn ${
            Limit.MAX_ATTEMPTS - updatedCustomer.attempts
          } lần thử`,
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prismaService.customer.update({
        where: {
          email,
        },
        data: {
          attempts: 0,
          is_verify_otp: true,
        },
      });

      return null;
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.BAD_REQUEST);
    }
  }

  async hashData(data: string) {
    return await argon2.hash(data);
  }

  async verifyHash(hashedData: string, plainData: string) {
    return await argon2.verify(hashedData, plainData);
  }
}
