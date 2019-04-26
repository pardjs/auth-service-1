import { ApiModelProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiModelProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @ApiModelProperty({
    type: String,
    example: 'default role',
  })
  name: string;
}
