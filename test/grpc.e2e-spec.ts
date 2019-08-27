import {config} from 'dotenv';
import { join } from 'path';
config({
  path: join(__dirname, '../.env'),
});

import * as protoLoader from '@grpc/proto-loader';
import { logger } from '@pardjs/common';
import * as grpc from 'grpc';

const PROTO_PATH = __dirname + '/../pkg-common/auth-service.proto';
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
const client = new authProto.AuthService('localhost:6000', grpc.credentials.createInsecure());
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
'eyJsb2dpblNlc3Npb25JZCI6MSwiaWF0IjoxNTY2OTAzNjEwLCJleHAiOjE1NjY5Mzk2MTB9.' +
'RWMNam2gGDvP2ncQYHnkBo4lcKv4_zXOxRycZI2Acf4';

describe('prepared to test grpc', () => {
  it('Grpc should work', (done) => {
    logger.info(typeof client.canAccess);
    client.canAccess({
      token,
      // authPointName: 'THE_FAKE_POINT',
    }, (err: any, response: any) => {
      expect(err).toBeNull();
      expect(response.name).toBe('ip_whitelist_user');
      done();
    });
  });
});
