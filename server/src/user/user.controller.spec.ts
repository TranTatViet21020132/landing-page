import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateInformationDto } from './dto/createInformation.dto';
import { CreateApplicationDto } from './dto/createApplication.dto';
import { Status } from '@prisma/client';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createInformation: jest.fn(),
            createApplication: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('createInformation', () => {
    it('should return the result of userService.createInformation', async () => {
      const createInformationDto: CreateInformationDto = {
        email: 'vinhphuccse@gmail.com',
        phone: '0123456789',
        first_name: 'Vĩnh Phúc',
        last_name: 'Trần',
        identification: '0123456789999',
        personal_income: 1000000,
        province: 'Hồ Chí Minh',
        district: 'Tân Bình',
        ward: '13',
        street: 'Cộng Hòa',
      };
      const result = {
        id: '1',
        status: Status.ACTIVE,
        is_verify_otp: true,
        email: 'vinhphuccse@gmail.com',
        phone: '0123456789',
        first_name: 'Vĩnh Phúc',
        last_name: 'Trần',
        identification: '0123456789999',
        personal_income: 1000000,
        address: {
          province: 'Hồ Chí Minh',
          district: 'Tân Bình',
          ward: '13',
          street: 'Cộng Hòa',
          id: '1',
        },
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(userService, 'createInformation').mockResolvedValue(result);

      expect(await userController.createInformation(createInformationDto)).toBe(
        result,
      );
      expect(userService.createInformation).toHaveBeenCalledWith(
        createInformationDto,
      );
    });
  });

  describe('createApplication', () => {
    it('should return the result of userService.createApplication', async () => {
      const createApplicationDto: CreateApplicationDto = {
        loan_amount: 2000000,
        customer_id: '4a6217e3-4079-4ca5-8e80-e9a1f03ab5b5',
        reason_id: '1',
      };
      const result = {
        customer: {
          id: '1',
          status: Status.ACTIVE,
          is_verify_otp: true,
          email: 'vinhphuccse@gmail.com',
          phone: '0123456789',
          first_name: 'Vĩnh Phúc',
          last_name: 'Trần',
          identification: '0123456789999',
          personal_income: 1000000,
          address: {
            province: 'Hồ Chí Minh',
            district: 'Tân Bình',
            ward: '13',
            street: 'Cộng Hòa',
            id: '1',
          },
          created_at: new Date(),
          updated_at: new Date(),
        },
        id: '1',
        loan_amount: 1000,
        reason: {
          id: '1',
          type: 'type',
        },
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(userService, 'createApplication').mockResolvedValue(result);

      expect(await userController.createApplication(createApplicationDto)).toBe(
        result,
      );
      expect(userService.createApplication).toHaveBeenCalledWith(
        createApplicationDto,
      );
    });
  });
});
