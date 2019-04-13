import { checkEnv } from '@pardjs/common';

checkEnv('PARDJS_USERS_SERVICE_BASE_URL');

export const PARDJS_USERS_SERVICE_BASE_URL = process.env.PARDJS_USERS_SERVICE_BASE_URL;
