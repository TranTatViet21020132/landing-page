import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createApplication(email: string) {
    try {
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
          first_name: 'John',
          last_name: 'Doe',
          address_id: '123',
          personal_income: 10101,
          phone: '0112345678',
        },
      });

      const application = await this.prismaService.application.create({
        data: {
          loan_amount: 10000,
          customer_id: updateCustomer.id,
          reason_id: '1',
        },
      });

      return { updateCustomer, application };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
