import { ApiModelProperty } from '@nestjs/swagger';

export class SetRoleAuthPointsDto {
  @ApiModelProperty({
    type: Number,
    isArray: true,
    example: [1, 2, 3],
  })
  authPointIds: number[];
}
