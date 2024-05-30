import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResTransformInterceptor } from 'src/common/interceptors/response.interceptor';
import { ResponseMessage } from 'src/common/decorators';

@Controller('user')
@UseInterceptors(ResTransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-application')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Create application successfully')
  async createApplication(@Body() body) {
    return this.userService.createApplication(body);
  }
}
