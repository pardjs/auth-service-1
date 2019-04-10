import { ApiModelProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  employeeId: string;

  @ApiModelProperty()
  displayName: string;

  @ApiModelProperty()
  createdAt: string;

  @ApiModelProperty()
  updatedAt: string;
}
