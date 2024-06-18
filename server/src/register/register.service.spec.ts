import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RegisterService } from './register.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import * as argon2 from 'argon2';
import * as otpGenerator from 'otp-generator';
import { Status } from '@prisma/client';

jest.mock('argon2');
jest.mock('otp-generator');

describe('RegisterService', () => {
  let service: RegisterService;
  let prismaService: PrismaService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        {
          provide: PrismaService,
          useValue: {
            customer: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
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

    service = module.get<RegisterService>(RegisterService);
    prismaService = module.get<PrismaService>(PrismaService);
    mailerService = module.get<MailerService>(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerAccount', () => {
    it('should successfully register a new account', async () => {
      const registerDto = { email: 'test@example.com' };
      const generatedOtp = '123456';
      const hashedOtp = 'hashed_otp';

      (prismaService.customer.findUnique as jest.Mock).mockResolvedValue(null);
      (otpGenerator.generate as jest.Mock).mockReturnValue(generatedOtp);
      (argon2.hash as jest.Mock).mockResolvedValue(hashedOtp);
      (prismaService.customer.create as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      });
      (mailerService.sendMail as jest.Mock).mockResolvedValue(true);

      const result = await service.registerAccount(registerDto);

      expect(prismaService.customer.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(otpGenerator.generate).toHaveBeenCalledWith(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: true,
      });
      expect(argon2.hash).toHaveBeenCalledWith(generatedOtp);
      expect(prismaService.customer.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          otp: hashedOtp,
          attempts: 0,
          personal_income: 0,
          status: 'ACTIVE',
        },
      });
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: 'test@example.com',
        subject: '[Loan Service]',
        displayName: 'Customer',
        otp: generatedOtp,
        type: 'confirm',
      });
      expect(result).toEqual({ id: 1, email: 'test@example.com' });
    });
  });

  describe('checkValidOtp', () => {
    it('should successfully validate the OTP', async () => {
      const data = { email: 'test@example.com', otp: '123456' };
      const hashedOtp = 'hashed_otp';

      (prismaService.customer.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        otp: hashedOtp,
        status: Status.ACTIVE,
        attempts: 0,
        is_verify_otp: false,
        updated_at: new Date(),
      });
      (argon2.verify as jest.Mock).mockResolvedValue(true);
      (prismaService.customer.update as jest.Mock).mockResolvedValue(true);

      const result = await service.checkValidOtp(data);

      expect(prismaService.customer.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        select: {
          id: true,
          otp: true,
          status: true,
          attempts: true,
          is_verify_otp: true,
          updated_at: true,
        },
      });
      expect(argon2.verify).toHaveBeenCalledWith(hashedOtp, '123456');
      expect(prismaService.customer.update).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        data: {
          attempts: 0,
          is_verify_otp: true,
        },
      });
      expect(result).toBeNull();
    });

    it('should throw an exception if OTP is incorrect', async () => {
      const data = { email: 'test@example.com', otp: 'wrong_otp' };

      (prismaService.customer.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        otp: 'hashed_otp',
        status: Status.ACTIVE,
        attempts: 0,
        is_verify_otp: false,
        updated_at: new Date(),
      });
      (argon2.verify as jest.Mock).mockResolvedValue(false);
      (prismaService.customer.update as jest.Mock).mockResolvedValue({
        attempts: 1,
      });

      await expect(service.checkValidOtp(data)).rejects.toThrow(
        new HttpException(
          'OTP không đúng, bạn còn 4 lần thử',
          HttpStatus.BAD_REQUEST,
        ),
      );

      expect(prismaService.customer.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        select: {
          id: true,
          otp: true,
          status: true,
          attempts: true,
          is_verify_otp: true,
          updated_at: true,
        },
      });
      expect(argon2.verify).toHaveBeenCalledWith('hashed_otp', 'wrong_otp');
      expect(prismaService.customer.update).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        data: {
          attempts: 1,
        },
      });
    });

    it('should throw an exception if customer account is locked', async () => {
      const data = { email: 'blocked@example.com', otp: '123456' };
      const blockedTime = new Date(Date.now() - 5 * 60000); // 5 minutes ago

      (prismaService.customer.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        otp: 'hashed_otp',
        status: Status.BLOCKED,
        attempts: 3,
        is_verify_otp: false,
        updated_at: blockedTime,
      });

      await expect(service.checkValidOtp(data)).rejects.toThrow(
        new HttpException(
          'Tài khoản của bạn đã bị khóa',
          HttpStatus.BAD_REQUEST,
        ),
      );

      expect(prismaService.customer.findUnique).toHaveBeenCalledWith({
        where: { email: 'blocked@example.com' },
        select: {
          id: true,
          otp: true,
          status: true,
          attempts: true,
          is_verify_otp: true,
          updated_at: true,
        },
      });
    });
  });
});
