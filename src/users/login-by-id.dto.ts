import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginByIdDto {
    @ApiModelProperty({example: '1001'})
    @IsString()
    employeeId: string;

    @ApiModelProperty({example: 'P@ssW0rd'})
    @IsString()
    password: string;
}
