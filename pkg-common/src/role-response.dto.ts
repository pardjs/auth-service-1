import { ApiModelProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  name: string;
}
