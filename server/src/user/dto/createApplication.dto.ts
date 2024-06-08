import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty({ message: 'Loan amount cannot be empty' })
  @IsNumber()
  loan_amount: number;

  @IsNotEmpty({ message: 'Customer id cannot be empty' })
  @IsString({ message: 'Customer id must be string format' })
  customer_id: string;

  @IsNotEmpty({ message: 'Reason id cannot be empty' })
  @IsString({ message: 'Reason id must be string format' })
  reason_id: string;
}
