import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  Length,
} from 'class-validator';

export class CreateInformationDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Phone number cannot be empty' })
  @IsString({ message: 'Phone number must be string format' })
  @Length(10)
  phone: string;

  @IsNotEmpty({ message: 'First name cannot be empty' })
  @IsString({ message: 'First name must be string format' })
  first_name: string;

  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @IsString({ message: 'Last name must be string format' })
  last_name: string;

  @IsNotEmpty({ message: 'Personal income cannot be empty' })
  @IsNumber()
  personal_income: number;

  @IsNotEmpty({ message: 'Province cannot be empty' })
  @IsString({ message: 'Province must be string format' })
  province: string;

  @IsNotEmpty({ message: 'District cannot be empty' })
  @IsString({ message: 'District must be string format' })
  district: string;

  @IsNotEmpty({ message: 'Ward cannot be empty' })
  @IsString({ message: 'Ward must be string format' })
  ward: string;

  @IsNotEmpty({ message: 'Street cannot be empty' })
  @IsString({ message: 'Street must be string format' })
  street: string;
}
