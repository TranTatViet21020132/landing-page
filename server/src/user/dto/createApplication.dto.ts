import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  phone: string;
  first_name: string;
  last_name: string;
  personal_income: number;
}
