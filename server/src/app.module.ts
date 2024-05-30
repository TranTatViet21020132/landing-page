import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [UserModule, RegisterModule],
})
export class AppModule {}
