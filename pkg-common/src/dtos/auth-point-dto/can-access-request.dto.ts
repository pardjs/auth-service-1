import { IsOptional, IsString } from 'class-validator';
export class CanAccessDto {
  @IsString()
  token: string;

  @IsString()
  @IsOptional()
  authPointName?: string;
}
