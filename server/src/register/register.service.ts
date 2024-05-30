import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { Limit, sendMailOptions } from './types';
import otpGenerator from 'otp-generator';
import { Status } from '@prisma/client';

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
          'Customer is already existed',
          HttpStatus.BAD_REQUEST,
        );
      }

      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const hashOtp = await this.hashData(otp);

      const newCustomer = await this.prismaService.customer.create({
        data: {
          email: email,
          otp: hashOtp,
          first_name: null,
          last_name: null,
          address: null,
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
      };

      await this.mailerService.sendMail(sendMailOptions);
      return newCustomer;
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.BAD_REQUEST);
    }
  }

  async checkValidOtp(email: string, otp: string) {
    try {
      const customer = await this.prismaService.customer.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          otp: true,
          status: true,
          attempts: true,
        },
      });

      if (!customer) {
        throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
      }

      if (customer.status === Status.BLOCKED) {
        throw new HttpException('User is blocked', HttpStatus.BAD_REQUEST);
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
            'Customer is blocked',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException(
          `Invalid otp, you have ${
            Limit.MAX_ATTEMPTS - updatedCustomer.attempts
          } attempts left`,
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
