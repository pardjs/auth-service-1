import { ApiModelProperty } from '@nestjs/swagger';

export class UpsertRoleDto {
  @ApiModelProperty()
  name: string;
}
