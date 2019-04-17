import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginByUsernameDto {
  @ApiModelProperty({ example: 'goodbai' })
  @IsString()
  username: string;

  @ApiModelProperty({ example: 'P@ssW0rd' })
  @IsString()
  password: string;
}
