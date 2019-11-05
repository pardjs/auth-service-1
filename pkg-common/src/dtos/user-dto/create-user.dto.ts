import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiModelProperty({
    type: String,
    example: 'goodbai',
  })
  @IsString()
  username: string;

  @ApiModelProperty({
    example: 'P@ssW0rd',
    type: String,
  })
  @IsString()
  @MinLength(5)
  password: string;

  @ApiModelProperty({
    example: '白国栋',
    type: String,
  })
  @MinLength(2)
  @IsString()
  name: string;
}
