import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInformationDto } from './dto/createInformation.dto';
import { CreateApplicationDto } from './dto/createApplication.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createInformation(data: CreateInformationDto) {
    try {
      const {
        email,
        first_name,
        last_name,
        personal_income,
        phone,
        district,
        province,
        ward,
        street,
      } = data;
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
        throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
      }

      if (customer) {
        if (!customer.is_verify_otp) {
          throw new HttpException(
            'You are not verify account',
            HttpStatus.BAD_REQUEST,
          );
        } else if (customer.status === 'BLOCKED') {
          throw new HttpException(
            'Your account has been blocked',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const updateCustomer = await this.prismaService.customer.update({
        where: {
          email,
        },
        data: {
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
          is_verify_otp: true,
          status: true,
        },
      });

      if (!customer) {
        throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
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
          customer_id: true,
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

      return application;
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
