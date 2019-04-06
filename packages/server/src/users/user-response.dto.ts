import { ApiModelProperty } from '@nestjs/swagger';

export class UserResponse {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    employeeId: string;

    @ApiModelProperty()
    showName: string;

    @ApiModelProperty()
    role: string;

    @ApiModelProperty()
    createdAt: string;

    @ApiModelProperty()
    updatedAt: string;
}
