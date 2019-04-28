export enum UsersServiceAuthPoints {
  FIND_USERS = 'USERS_SERVICE-FIND_USERS',
  UPDATE_USER = 'USERS_SERVICE-UPDATE_USER',
  DELETE_USER = 'USERS_SERVICE-DELETE_USER',
  FIND_USER_ROLES = 'USERS_SERVICE-FIND_USER-ROLES',
  ACT_USER_AUTH_CHECK = 'USERS_SERVICE-ACT_USER-AUTH-CHECK',
  ACT_AUTH_POINT_REGISTER = 'USERS_SERVICE-ACT_AUTH_POINT_REGISTER',
  FIND_AUTH_POINTS = 'USERS_SERVICE-FIND_AUTH_POINTS',
  FIND_ROLES = 'USERS_SERVICE-FIND_ROLES',
  SET_USER_ROLES = 'USERS_SERVICE-SET_USER_ROLES',
  CREATE_USER = 'USERS_SERVICE-CREATE_USER',
  FIND_ROLE = 'USERS_SERVICE-FIND_ROLE',
  FIND_ONE_USER = 'USERS_SERVICE-FIND_ONE_USER',
  MGR_SET_USER_PASSWORD = 'USERS_SERVICE-MGR_SET_USER_PASSWORD',
  MGR_FIND_USERS = 'USERS_SERVICE-MGR_FIND_USERS',
  MGR_CREATE_USER = 'MGR_CREATE_USER',
  MGR_UPDATE_USER = 'MGR_UPDATE_USER',
}

export const UsersServiceAuthPointNames = {
  [UsersServiceAuthPoints.FIND_USERS]: 'find users',
  [UsersServiceAuthPoints.UPDATE_USER]: 'update user by id',
  [UsersServiceAuthPoints.DELETE_USER]: 'delete user by id',
  [UsersServiceAuthPoints.FIND_USER_ROLES]: 'find user roles',
  [UsersServiceAuthPoints.ACT_USER_AUTH_CHECK]:
    'check if a user can access a specific auth point',
  [UsersServiceAuthPoints.ACT_AUTH_POINT_REGISTER]:
    'register auth points via api',
  [UsersServiceAuthPoints.FIND_AUTH_POINTS]: 'find auth points',
  [UsersServiceAuthPoints.FIND_ROLES]: 'find roles',
  [UsersServiceAuthPoints.SET_USER_ROLES]: 'set user roles',
  [UsersServiceAuthPoints.CREATE_USER]: 'create user',
  [UsersServiceAuthPoints.FIND_ROLE]: 'find role by id',
  [UsersServiceAuthPoints.FIND_ONE_USER]: 'find user by id',
};
