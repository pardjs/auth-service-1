import { SECONDS_ONE_HOUR } from '@pardjs/common';

export const LOGIN_SESSION_LIFE_HOURS = parseInt(
  process.env.LOGIN_SESSION_LIFE_HOURS,
  10,
);
export const LOGIN_SESSION_LIFE_SECONDS =
  LOGIN_SESSION_LIFE_HOURS * SECONDS_ONE_HOUR;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PASSWORD_HASH_KEY = process.env.PASSWORD_HASH_KEY;
