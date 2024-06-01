import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResTransformInterceptor } from 'src/common/interceptors/response.interceptor';
import { ResponseMessage } from 'src/common/decorators';
import { CreateInformationDto } from './dto/createInformation.dto';
import { CreateApplicationDto } from './dto/createApplication.dto';

@Controller('user')
@UseInterceptors(ResTransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create/information')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Create information successfully')
  async createInformation(@Body() body: CreateInformationDto) {
    return this.userService.createInformation(body);
  }

  @Post('create/application')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Create application successfully')
  async createApplication(@Body() body: CreateApplicationDto) {
    return this.userService.createApplication(body);
  }
}
