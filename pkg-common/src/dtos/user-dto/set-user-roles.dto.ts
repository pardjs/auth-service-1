import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator'

export class SetUserRolesDto {
  @ApiModelProperty({
    type: Number,
    isArray: true,
    example: [1, 2, 3],
  })
  @IsNumber({}, {each: true})
  roleIds: number[];
}
