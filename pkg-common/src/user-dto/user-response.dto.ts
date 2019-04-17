import { ApiModelProperty } from '@nestjs/swagger';
import { RoleResponseDto } from '../role-dto/role-response.dto';

export class UserResponse {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  roles: RoleResponseDto[];

  @ApiModelProperty()
  createdAt: string;

  @ApiModelProperty()
  updatedAt: string;
}
