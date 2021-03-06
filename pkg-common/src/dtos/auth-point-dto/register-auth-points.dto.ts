import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CreateAuthPointDto } from './create-auth-point.dto';

export class RegisterAuthPointsDto {
    @ApiModelProperty({
        type: CreateAuthPointDto,
        isArray: true,
    })
    @IsArray()
    authPoints: CreateAuthPointDto[];
}
