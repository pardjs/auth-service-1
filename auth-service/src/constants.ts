import { checkEnv, SECONDS_ONE_HOUR } from '@pardjs/common-1';

checkEnv(
  'SUPER_ADMIN_INITIAL_PASSWORD',
  'JWT_SECRET',
  'PASSWORD_HASH_KEY',
  'IP_WHITE_LIST',
  'IP_WHITE_LIST_USERNAME',
);

export const LOGIN_SESSION_LIFE_HOURS = process.env.LOGIN_SESSION_LIFE_HOURS ? parseInt(
  process.env.LOGIN_SESSION_LIFE_HOURS,
  10,
) : 2;
export const LOGIN_SESSION_LIFE_SECONDS =
  LOGIN_SESSION_LIFE_HOURS * SECONDS_ONE_HOUR;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PASSWORD_HASH_KEY = process.env.PASSWORD_HASH_KEY;
export const SUPER_ADMIN_INITIAL_PASSWORD =
  process.env.SUPER_ADMIN_INITIAL_PASSWORD;
export const IP_WHITE_LIST = process.env.IP_WHITE_LIST.split(',');
export const IP_WHITE_LIST_USER_NAME = process.env.IP_WHITE_LIST_USERNAME;
// TODO: config via env variable.
export const ADMIN_USER_ID = 1;
export const IP_WHITE_LIST_USER_ID = 2;
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
export const GRPC_PORT = process.env.GRPC_PORT ? parseInt(process.env.GRPC_PORT, 10) : 6000;
export const SERVICE_BASE = process.env.SERVICE_BASE || '';
export const API_PREFIX = process.env.API_PREFIX || '';
export const API_TYPE = process.env.API_TYPE || 'restful';
