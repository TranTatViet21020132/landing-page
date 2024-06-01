import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from './dto/register.dto';
import { ResTransformInterceptor } from 'src/common/interceptors/response.interceptor';
import { ResponseMessage } from 'src/common/decorators';
import { CheckValidOtp } from './dto/checkValidOtp.dto';

@Controller('register')
@UseInterceptors(ResTransformInterceptor)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('check-otp')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Otp is valid')
  async checkValidOtp(@Body() body: CheckValidOtp) {
    return this.registerService.checkValidOtp(body);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Customer registered successfully')
  async registerAccountDto(@Body() registerAccountDto: RegisterDto) {
    return this.registerService.registerAccount(registerAccountDto);
  }
}
