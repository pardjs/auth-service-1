import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthPointDto {
    @ApiModelProperty({
        type: String,
        example: 'USERS_SERVICE-FIND_USERS',
    })
    @IsString()
    name: string;

    @ApiModelProperty({
        type: String,
        example: 'Find users',
    })
    @IsString()
    displayName: string;
}
