# Pardjs Auth Service

## Configuration

| Environment Variable | Description | Example | Default Value |
| --- | --- | --- | --- |
| `SERVICE_BASE` | the base url of this service behind the reverse-proxy server | `'/auth-service'` | `''` |
| `API_PREFIX` | the prefix of APIs | `'/api'` | `''` |
| `PORT` | the port of restful APIs | `5000` | `5000` |
| `GRPC_PORT` | the port of restful APIs | `6000` | `6000` |
| `SUPER_ADMIN_INITIAL_PASSWORD` | the initial password of super admin | `'sup5r.3om'` | `NONE` |
| `API_TYPE` | the type of api this service provides, only one type of service can be provided at one run. `restful` or `grpc` | `restful` | `restful` |

## File structure

- Main
  - `src/API/restful` All the restful apis provided by `Pardjs Auth Service`
  - `src/API/grpc` All the grpc apis provided by `Pardjs Auth Service`
  - DAO layer and Business Logic layer(BLL).
    - `src/BLL/auth`
    - `src/BLL/auth-points`
    - `src/BLL/login-session`
    - `src/BLL/roles`
  - `API/*` depend on `BLL/*`
  - `DAO` layer is powered by typeorm and embedded into `BLL`
- NPM
  - `pkg-common` a npm package used by both server side and client side.
  - `pkg-sdk` a npm package used by `other pardjs services` to integrate with `Pardjs Auth Service`
- Other
  - `docker` the example `docker-compose` config fle.
  - `db-migration` the `typeorm` migration files.

## User Types

- `SuperAdmin`: the super user can access all auth-points.
- `WhiteListUser`: login by ip white list, can access as many auth points as SuperAdmin, but this user can be restricted by assigning him some role. Usually used for communication between internal services.
- `CommonUser`: can only access the auth-points allowed.

## About Roles [TBD]

- `Anonymous`: APIs without `AuthGuard`. Should let the `AuthService` know the occurrence of `Anonymous request` (currently not) ?.
- `Authorized`: Any user with valid `access token` will implicitly have a role `Authorized` appended.
- Other roles can be created via `config-file.yaml` / `CMS UI` / `Roles Restful API` / `Roles GRPC API` dynamically.

## Best Practices

- `RBAC`: All users are under role-based access control except `SuperAdmin`.
- `SIMPLE`: Create one `CommonAdmin` user with `SuperAdmin`, `CommonAdmin` can manage `CommonUsers`, `CommonUsers` will be assigned `the default role` once created.
