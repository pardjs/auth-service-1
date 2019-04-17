import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiModelProperty({
    example: 'goodbai',
  })
  @IsString()
  username: string;

  @ApiModelPropertyOptional({
    example: 'P@ssW0rd',
  })
  @IsString()
  @MinLength(5)
  @IsOptional()
  password: string;

  @ApiModelProperty({
    example: '白国栋',
  })
  @MinLength(2)
  @IsString()
  name: string;
}
