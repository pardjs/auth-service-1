import {config} from 'dotenv';
import { join } from 'path';
config({
  path: join(__dirname, '../.env'),
});

import { UserResponseDto } from '@pardjs/auth-service-common'
import * as protoLoader from '@grpc/proto-loader';
import { logger } from '@pardjs/common-1';
import * as grpc from 'grpc';

const PROTO_PATH = __dirname + '/../node_modules/@pardjs/auth-service-common/auth-service.proto';
console.log(PROTO_PATH);
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);

const authProto = grpc.loadPackageDefinition(packageDefinition).authService;
const client = new (authProto as any).AuthService('localhost:6000', grpc.credentials.createInsecure());
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblNlc3Npb25JZCI6MiwiaWF0IjoxNTcyOTQyOTkzLCJleHAiOjE1NzI5Nzg5OTN9.2mk8d1zFZX9L-DpTColsUf-JAFodi4SZlg4YojGPXAQ';

describe('prepared to test grpc', () => {
  it('Grpc should work', (done) => {
    logger.info(typeof client.canAccess);
    client.canAccess({
      token,
      // authPointName: 'THE_FAKE_POINT',
    }, (err: any, response: UserResponseDto) => {
      expect(err).toBeNull();
      expect(response.name).toBe('ip_whitelist_user');
      done();
    });
  });
});
