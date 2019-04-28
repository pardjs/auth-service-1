import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { ErrorKeys } from '../errors';

export class ChangePasswordDto {
  @ApiModelProperty({
    example: 'NewHello@Do021.com',
    type: String,
  })
  @IsString({ message: ErrorKeys.PASSWORD_IS_STRING })
  @MinLength(5, { message: ErrorKeys.PASSWORD_MIN_LENGTH_5 })
  newPassword: string;

  @ApiModelProperty({
    example: 'OldHello@Do021.com',
    type: String,
  })
  @IsString({message: ErrorKeys.PASSWORD_IS_STRING})
  @MinLength(5, { message: ErrorKeys.PASSWORD_MIN_LENGTH_5 })
  oldPassword: string;
}
