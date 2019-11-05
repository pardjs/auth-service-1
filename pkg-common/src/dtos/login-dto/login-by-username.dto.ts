import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginByUsernameDto {
  @ApiModelProperty({
    type: String,
    example: 'admin',
  })
  @IsString()
  username: string;

  @ApiModelProperty({
    type: String,
    example: 'password',
  })
  @IsString()
  password: string;
}
