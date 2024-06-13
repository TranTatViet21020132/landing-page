import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class CheckValidOtp {
  @IsNotEmpty({ message: 'Email không thể rỗng' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;

  @IsNotEmpty({ message: 'OTP không thể rỗng' })
  @IsString({ message: 'OTP phải là chuỗi' })
  @Length(6)
  otp: string;
}
