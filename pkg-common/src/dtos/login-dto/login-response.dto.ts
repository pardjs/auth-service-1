import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResponse {
    @ApiModelProperty({
        type: Number,
        example: 1,
    })
    userId: number;

    @ApiModelProperty({
        type: String,
        example: 1,
    })
    token: string;

    @ApiModelProperty({
        type: Number,
        example: 2000
    })
    expiresIn: number;
}
