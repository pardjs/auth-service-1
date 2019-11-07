import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiModelProperty({
    example: 'goodbai',
    type: String,
  })
  @IsString()
  username: string;

  @ApiModelPropertyOptional({
    example: 'P@ssW0rd',
    type: String,
  })
  @IsString()
  @MinLength(5)
  @IsOptional()
  password: string;

  @ApiModelProperty({
    example: '白国栋',
    type: String,
  })
  @MinLength(2)
  @IsString()
  name: string;
}
