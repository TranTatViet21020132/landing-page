import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { RegisterDto } from './dto/register.dto';
import { CheckValidOtp } from './dto/checkValidOtp.dto';
import { Status } from '@prisma/client';

describe('RegisterController', () => {
  let registerController: RegisterController;
  let registerService: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        {
          provide: RegisterService,
          useValue: {
            registerAccount: jest.fn(),
            checkValidOtp: jest.fn(),
          },
        },
      ],
    }).compile();

    registerController = module.get<RegisterController>(RegisterController);
    registerService = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(registerController).toBeDefined();
  });

  describe('registerAccountDto', () => {
    it('should return the result of registerService.registerAccount', async () => {
      const registerDto: RegisterDto = {
        email: 'vinhphuccse@gmail.com',
      };
      const expectedResult = {
        id: '1',
        status: Status.ACTIVE,
        is_verify_otp: true,
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

      jest
        .spyOn(registerService, 'registerAccount')
        .mockResolvedValue(expectedResult);

      expect(await registerController.registerAccountDto(registerDto)).toBe(
        expectedResult,
      );
      expect(registerService.registerAccount).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('checkValidOtp', () => {
    it('should return the result of registerService.checkValidOtp', async () => {
      const checkValidOtpDto: CheckValidOtp = {
        email: 'a@gmail.com',
        otp: '123456',
      };
      const expectedResult = true;

      jest
        .spyOn(registerService, 'checkValidOtp')
        .mockResolvedValue(expectedResult);

      expect(await registerController.checkValidOtp(checkValidOtpDto)).toBe(
        expectedResult,
      );
      expect(registerService.checkValidOtp).toHaveBeenCalledWith(
        checkValidOtpDto,
      );
    });
  });
});
