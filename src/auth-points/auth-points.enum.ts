export enum UsersServiceAuthPoints {
    FIND_USERS = 'USERS-SERVICE_FIND_USERS',
    UPDATE_USER = 'USERS-SERVICE_UPDATE_USER',
    DELETE_USER = 'USERS-SERVICE_DELETE_USER',
    FIND_USER_ROLES = 'USERS-SERVICE_FIND_USER-ROLES',
    ACT_USER_AUTH_CHECK = 'USERS-SERVICE_ACT_USER-AUTH-CHECK',
    ACT_AUTH_POINT_REGISTER = 'USERS-SERVICE_ACT_AUTH_POINT_REGISTER',
    FIND_AUTH_POINTS = 'USERS-SERVICE_FIND_AUTH_POINTS',
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
};
