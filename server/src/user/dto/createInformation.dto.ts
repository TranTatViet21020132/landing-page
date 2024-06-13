import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  Length,
} from 'class-validator';

export class CreateInformationDto {
  @IsNotEmpty({ message: 'Email không thể rỗng' })
  @IsEmail({}, { message: 'Email không phù hợp' })
  email: string;

  @IsNotEmpty({ message: 'Số điện thoại không thể rỗng' })
  @IsString({ message: 'Số điện thoại phải là chuỗi' })
  @Length(10)
  phone: string;

  @IsNotEmpty({ message: 'Tên khách hàng không thể rỗng' })
  @IsString({ message: 'Tên khách hàng phải là chuỗi' })
  first_name: string;

  @IsNotEmpty({ message: 'Căn cước công dân không thể rỗng' })
  @IsString({ message: 'Căn cước công dân phải là chuỗi' })
  @Length(12)
  identification: string;

  @IsNotEmpty({ message: 'Họ khách hàng không thể rỗng' })
  @IsString({ message: 'Họ khách hàng phải là chuỗi' })
  last_name: string;

  @IsNotEmpty({ message: 'Thu nhập cá nhân khách hàng không thể rỗng' })
  @IsNumber()
  personal_income: number;

  @IsNotEmpty({ message: 'Tên tỉnh không thể rỗng' })
  @IsString({ message: 'Tên tỉnh phải là chuỗi' })
  province: string;

  @IsNotEmpty({ message: 'Tên huyện không thể rỗng' })
  @IsString({ message: 'Tên huyện phải là chuỗi' })
  district: string;

  @IsNotEmpty({ message: 'Tên quận không thể rỗng' })
  @IsString({ message: 'Tên quận phải là chuỗi' })
  ward: string;

  @IsNotEmpty({ message: 'Tên đường không thể rỗng' })
  @IsString({ message: 'Tên đường phải là chuỗi' })
  street: string;
}
