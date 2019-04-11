import { ApiModelProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  createdAt: string;

  @ApiModelProperty()
  updatedAt: string;
}
