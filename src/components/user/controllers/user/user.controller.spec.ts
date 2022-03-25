// import { Test, TestingModule } from '@nestjs/testing';
// import { mockUserService } from '../../../../../test/mocks/services/user.mock';
// import { mockCreateUserService } from '../../../../../test/mocks/services/create-user.mock';
// import { mockGoogleOauth } from '../../../../../test/mocks/services/google-oauth.mock';
// import { CreateUserService } from '../../services/user.service';
// import { GoogleOauthService } from '../../services/social-auth/google-oauth/google-oauth.service';
// import { UserService } from '../../services/user/user.service';

// import { UserController } from './user.controller';

// describe('UserController', () => {
//   let controller: UserController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [CreateUserService, GoogleOauthService, UserService],
//     })
//     .overrideProvider(CreateUserService)
//     .useValue(mockCreateUserService)
//     .overrideProvider(GoogleOauthService)
//     .useValue(mockGoogleOauth)
//     .overrideProvider(UserService)
//     .useValue(mockUserService)
//     .compile();

//     controller = module.get<UserController>(UserController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
