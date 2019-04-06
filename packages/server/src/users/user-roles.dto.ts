import { ApiModelProperty } from '@nestjs/swagger';
import { TypeNameObjDto } from '@pardjs/common';

export class UserRolesDto {
  @ApiModelProperty({
    isArray: true,
    type: TypeNameObjDto,
  })
  data: TypeNameObjDto[];
}
