import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { UserService } from './user.service';
import { CreateInformationDto } from './dto/createInformation.dto';
import { CreateApplicationDto } from './dto/createApplication.dto';
import { Status } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            address: {
              findFirst: jest.fn(),
              create: jest.fn(),
            },
            customer: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            application: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createInformation', () => {
    it('should create or update customer information', async () => {
      const createInformationDto: CreateInformationDto = {
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        personal_income: 1200000,
        identification: '1234567890',
        phone: '123456789',
        province: 'Hanoi',
        district: 'Ba Dinh',
        ward: '12',
        street: 'ABC Street',
      };

      const mockAddress = { id: '1', ...createInformationDto }; // Adjusted mockAddress to include all fields
      const mockCustomer = {
        id: '1',
        status: Status.ACTIVE,
        is_verify_otp: true,
        ...createInformationDto, // Include all fields from createInformationDto
        created_at: new Date(),
        updated_at: new Date(),
        address_id: '1',
        otp: '123456',
        attempts: 1,
      };
      const mockUpdateCustomer = { ...mockCustomer }; // No need to spread createInformationDto again

      jest.spyOn(prismaService.address, 'findFirst').mockResolvedValue(null);
      jest
        .spyOn(prismaService.address, 'create')
        .mockResolvedValue(mockAddress);
      jest
        .spyOn(prismaService.customer, 'findUnique')
        .mockResolvedValue(mockCustomer);
      jest
        .spyOn(prismaService.customer, 'update')
        .mockResolvedValue(mockUpdateCustomer);

      const result = await service.createInformation(createInformationDto);

      expect(result).toEqual(mockUpdateCustomer);
    });

    it('should throw HttpException if personal income is less than 1000000', async () => {
      const createInformationDto: CreateInformationDto = {
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        personal_income: 500000,
        identification: '1234567890',
        phone: '123456789',
        province: 'Hanoi',
        district: 'Ba Dinh',
        ward: '12',
        street: 'ABC Street',
      };

      await expect(
        service.createInformation(createInformationDto),
      ).rejects.toThrowError(
        new HttpException(
          'Thu nhập tối thiểu chưa đủ yêu cầu vay',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('createApplication', () => {
    it('should create loan application and send email notification', async () => {
      const createApplicationDto: CreateApplicationDto = {
        customer_id: '1',
        loan_amount: 1500000,
        reason_id: '2',
      };

      const mockCustomer = {
        id: '1',
        status: Status.ACTIVE,
        is_verify_otp: true,
        is_submit: true,
        email: 'vinhphuccse@gmail.com',
        phone: '0123456789',
        first_name: 'Vĩnh Phúc',
        last_name: 'Trần',
        identification: '0123456789999',
        personal_income: 1000000,
        address_id: '1',
        otp: '123456',
        attempts: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockApplication = {
        id: '1',
        ...createApplicationDto,
        is_submit: true,
        customer: {
          first_name: mockCustomer.first_name,
          last_name: mockCustomer.last_name,
        },
        reason: { id: '2', type: 'type' },
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      };

      jest
        .spyOn(prismaService.customer, 'findUnique')
        .mockResolvedValue(mockCustomer);
      jest
        .spyOn(prismaService.application, 'create')
        .mockResolvedValue(mockApplication);
      jest.spyOn(mailerService, 'sendMail').mockResolvedValue(undefined);

      const result = await service.createApplication(createApplicationDto);

      expect(result).toEqual(mockApplication);
      expect(mailerService.sendMail).toHaveBeenCalled();
    });

    it('should throw HttpException if customer is not found', async () => {
      const createApplicationDto: CreateApplicationDto = {
        customer_id: '999',
        loan_amount: 1500000,
        reason_id: '2',
      };

      jest.spyOn(prismaService.customer, 'findUnique').mockResolvedValue(null);

      await expect(
        service.createApplication(createApplicationDto),
      ).rejects.toThrow(
        new HttpException('Không tìm thấy tài khoản', HttpStatus.BAD_REQUEST),
      );
    });
  });
});
