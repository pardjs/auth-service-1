import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResponse {
    @ApiModelProperty()
    userId: number;
    @ApiModelProperty()
    token: string;
    @ApiModelProperty()
    expiresIn: number;
}
