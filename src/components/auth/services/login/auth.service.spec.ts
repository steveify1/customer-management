import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mockAuthService } from '../../../../../test/mocks/services/auth.mock';
import { mockUserService } from '../../../../../test/mocks/services/user.mock';
import { UserService } from '../../../user/services/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, {
        provide: ConfigService,
        useValue: {
          get: jest.fn((key: string) => {
            // this is being super extra, in the case that you need multiple keys with the `get` method
            if (key === 'FOO') {
              return 123;
            }
            return null;
          })
        }
      }],
    })
    .overrideProvider(UserService)
    .useValue(mockUserService)
    .compile();

    service = module.get<AuthService>(AuthService);
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
