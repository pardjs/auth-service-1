export const UserErrors = {
  LOGIN_SESSION_TIMEOUT: {
    type: 'LOGIN_SESSION_TIMEOUT',
    message: '登陆凭证已过期，请重新登陆。',
  },
  INVALID_LOGIN_ID_OR_PASSWORD: {
    type: 'INVALID_LOGIN_ID_OR_PASSWORD',
    message: '用户名或密码错误，请检查后重试。',
  },
  INVALID_LOGIN_NAME_OR_PASSWORD: {
    type: 'INVALID_LOGIN_NAME_OR_PASSWORD',
    message: '用户名或密码错误，请检查后重试。',
  },
  USER_NOT_FOUND: {
    type: 'USER_NOT_FOUND',
    message: '用户不存在，请检查登陆信息或联系系统管理员',
  },
};
