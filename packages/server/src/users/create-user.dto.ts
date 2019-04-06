import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { UserRoles } from './user-roles';

export class CreateUserDto {
  @ApiModelProperty({
    example: '1001',
  })
  @IsString()
  @MinLength(4) // TODO: the real pattern of employeeId
  employeeId: string;

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
  showName: string;

  @ApiModelProperty({
    enum: UserRoles,
    example: UserRoles.ADMIN,
  })
  @IsEnum(UserRoles)
  role: string;
}
