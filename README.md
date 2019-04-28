# Pardjs Users Service

## User Type

- SuperAdmin: the super user can access all auth-points.
- WhiteListUser: login by ip white list, can access as many auth points as SuperAdmin, but this user can be restricted by assigning him some role. Usually used for communication between internal services.
- CommonUser: can only access the auth-points allowed.

## Run Mode

- RBAC: role-based access control.
- SIMPLE: Create one CommonAdmin user with SuperAdmin, CommonAdmin can manage CommonUsers, CommonUsers will be assigned the default role once created.