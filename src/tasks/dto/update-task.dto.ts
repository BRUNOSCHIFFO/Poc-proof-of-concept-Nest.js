import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;
  //status?: boolean;
  @IsString()
  @IsOptional()
  description?: string;
}
