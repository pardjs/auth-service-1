import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiModelProperty({
    type: String,
    example: 'CMS Editor',
  })
  @IsString()
  name: string;
}
