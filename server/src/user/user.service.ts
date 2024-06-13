import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInformationDto } from './dto/createInformation.dto';
import { CreateApplicationDto } from './dto/createApplication.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { sendMailOptions } from 'src/register/types';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private mailerService: MailerService,
  ) {}

  async createInformation(data: CreateInformationDto) {
    try {
      const {
        email,
        first_name,
        last_name,
        personal_income,
        identification,
        phone,
        district,
        province,
        ward,
        street,
      } = data;

      if (personal_income < 1000000) {
        throw new HttpException(
          'Thu nhập tối thiểu chưa đủ yêu cầu vay',
          HttpStatus.BAD_REQUEST,
        );
      }

      const address = await this.prismaService.address.findFirst({
        where: {
          province,
          district,
          ward,
          street,
        },
      });

      let address_id: string;
      if (!address) {
        const newAddress = await this.prismaService.address.create({
          data: {
            province,
            district,
            ward,
            street,
          },
        });
        address_id = newAddress.id;
      } else {
        address_id = address.id;
      }

      const customer = await this.prismaService.customer.findUnique({
        where: {
          email,
        },
        select: {
          is_verify_otp: true,
          status: true,
        },
      });

      if (!customer) {
        throw new HttpException(
          'Không tìm thấy tài khoản',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (customer) {
        if (!customer.is_verify_otp) {
          throw new HttpException(
            'Tài khoản của bạn chưa xác thực OTP',
            HttpStatus.BAD_REQUEST,
          );
        } else if (customer.status === 'BLOCKED') {
          throw new HttpException(
            'Tài khoản của bạn đã bị khóa',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const updateCustomer = await this.prismaService.customer.update({
        where: {
          email,
        },
        data: {
          identification: identification,
          first_name: first_name,
          last_name: last_name,
          personal_income: personal_income,
          phone: phone,
          address_id: address_id,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          identification: true,
          phone: true,
          personal_income: true,
          is_verify_otp: true,
          address: true,
          status: true,
          created_at: true,
          updated_at: true,
        },
      });

      return updateCustomer;
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createApplication(data: CreateApplicationDto) {
    try {
      const { customer_id, loan_amount, reason_id } = data;

      const customer = await this.prismaService.customer.findUnique({
        where: {
          id: customer_id,
        },
        select: {
          email: true,
          first_name: true,
          last_name: true,
          is_verify_otp: true,
          status: true,
          personal_income: true,
        },
      });

      if (!customer) {
        throw new HttpException(
          'Không tìm thấy tài khoản',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (customer.personal_income * 10 < loan_amount) {
        throw new HttpException(
          'Bạn chỉ có thể vay dưới 10 lần thu nhập cá nhân',
          HttpStatus.BAD_REQUEST,
        );
      }

      const application = await this.prismaService.application.create({
        data: {
          loan_amount,
          customer_id,
          reason_id,
          is_submit: true,
        },
        select: {
          id: true,
          customer: {
            select: {
              first_name: true,
              last_name: true,
              address: true,
            },
          },
          loan_amount: true,
          reason: {
            select: {
              id: true,
              type: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
      });

      const sendMailOptions: sendMailOptions = {
        to: customer.email,
        subject: '[Loan Service]',
        displayName: 'Customer',
        infoLoan: application,
        type: 'noti',
      };

      await this.mailerService.sendMail(sendMailOptions);

      return application;
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
