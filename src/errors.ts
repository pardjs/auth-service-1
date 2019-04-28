export const Errors = {
  PASSWORD_IS_STRING: {
    zh_CN: '密码需为字符串',
    en_US: 'Password should be string',
  },
  PASSWORD_MIN_LENGTH_5: {
    zh_CN: '密码长度至少为5',
    en_US: 'Min length of password should be 5',
  },
  WRONG_PASSWORD: {
    zh_CN: '密码错误',
    en_US: 'Wrong password.',
  },
  LOGIN_SESSION_TIMEOUT: {
    en_US: 'LOGIN_SESSION_TIMEOUT',
    zh_CN: '登陆凭证已过期，请重新登陆。',
  },
  INVALID_LOGIN_ID_OR_PASSWORD: {
    en_US: 'INVALID_LOGIN_ID_OR_PASSWORD',
    zh_CN: '用户名或密码错误，请检查后重试。',
  },
  INVALID_LOGIN_NAME_OR_PASSWORD: {
    en_US: 'INVALID_LOGIN_NAME_OR_PASSWORD',
    zh_CN: '用户名或密码错误，请检查后重试。',
  },
  USER_NOT_FOUND: {
    en_US: 'USER_NOT_FOUND',
    zh_CN: '用户不存在，请检查登陆信息或联系系统管理员',
  },
  BAD_OPERATION: {
    en_US: 'BAD_OPERATION',
    zh_CN: '违法操作，请停止。',
  }
};

export enum ErrorKeys {
  PASSWORD_IS_STRING = 'PASSWORD_IS_STRING',
  PASSWORD_MIN_LENGTH_5 = 'PASSWORD_MIN_LENGTH_5',
}
