import { ApiModelProperty } from '@nestjs/swagger';

export class SetUserRolesDto {
  @ApiModelProperty({
    type: Number,
    isArray: true,
    example: [1, 2, 3],
  })
  roleIds: number[];
}
