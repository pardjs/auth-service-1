import { ApiModelProperty } from '@nestjs/swagger';
import { RoleResponseDto } from '../role-dto/role-response.dto';

export class UserResponse {
  @ApiModelProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @ApiModelProperty({
    description: '用于登录的用户名',
    type: String,
    example: 'admin',
  })
  username: string;

  @ApiModelProperty({
    description: '用于显示的名字',
    type: String,
    example: '管理员',
  })
  name: string;

  @ApiModelProperty({
    type: RoleResponseDto,
    isArray: true,
  })
  roles: RoleResponseDto[];

  @ApiModelProperty({
    type: String,
  })
  createdAt: string;

  @ApiModelProperty({
    type: String,
  })
  updatedAt: string;
}
