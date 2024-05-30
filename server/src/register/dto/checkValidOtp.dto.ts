import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsString({ message: 'Otp must be a string' })
  @Length(6)
  otp: string;
}
