import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RegisterModule } from './register/register.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [UserModule, RegisterModule, PrismaModule, MailerModule],
})
export class AppModule {}
