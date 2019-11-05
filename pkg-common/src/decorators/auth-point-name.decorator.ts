import { SetMetadata } from '@nestjs/common';
export const AuthPointNameKey = 'authPointName';
export const AuthPointName = (authPointName: string) =>
  SetMetadata(AuthPointNameKey, authPointName);
