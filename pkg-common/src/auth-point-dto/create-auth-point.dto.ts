import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthPointDto {
    @ApiModelProperty()
    @IsString()
    name: string;

    @ApiModelProperty()
    @IsString()
    displayName: string;
}