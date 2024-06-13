import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty({ message: 'Thu nhập cá nhân không thể rỗng' })
  @IsNumber()
  loan_amount: number;

  @IsNotEmpty({ message: 'Id khách hàng không thể rỗng' })
  @IsString({ message: 'Id khách hàng phải là chuỗi' })
  customer_id: string;

  @IsNotEmpty({ message: 'Lý do vay không thể rỗng' })
  @IsString({ message: 'Lý do vay phải là chuỗi' })
  reason_id: string;
}
