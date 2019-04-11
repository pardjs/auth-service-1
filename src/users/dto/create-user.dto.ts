import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiModelProperty({
    example: 'goodbai',
  })
  @IsString()
  username: string;

  @ApiModelProperty({
    example: 'P@ssW0rd',
  })
  @IsString()
  @MinLength(5)
  password: string;

  @ApiModelProperty({
    example: '白国栋',
  })
  @MinLength(2)
  @IsString()
  name: string;
}
