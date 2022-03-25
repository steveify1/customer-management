// import { Test, TestingModule } from '@nestjs/testing';
// import { LoginService } from '../../../../modules/auth/services/login/login.service';
// import { mockUserService } from '../../../../../test/mocks/services/user.mock';
// import { UserService } from '../user/user.service';
// import { CreateUserService } from './create-user.service';
// import { mockLoginService } from '../../../../../test/mocks/services/login.mock';
// import { NotificationService } from '../../../../modules/notification/services/notification/notification.service';
// import { mockNotificationService } from '../../../../../test/mocks/services/notification-service.mock';
// import { DeviceService } from '../../../../modules/device/services/device/device.service';
// import { mockDeviceService } from '../../../../../test/mocks/services/device.mock';
// import { ProfileService } from '../../../../modules/profile/services/profile/profile.service';
// import { mockProfileService } from '../../../../../test/mocks/services/profile.mock';
// import { CreateWalletService } from '../../../wallet/services/create-wallet-service/create-wallet.service';
// import { mockCreateWalletService } from '../../../../../test/mocks/services/create-wallet.mock';
// import { GenderService } from '../../../gender/services/gender/gender.service';
// import { mockGenderService } from '../../../../../test/mocks/services/gender.mock';
// import { CreateDedicatedBankAccountService } from '../../../dedicated-bank-account/services/create-dedicated-bank-account-service/create-dedicated-bank-account.service';
// import { mockCreateDedicatedBankAccountService } from '../../../../../test/mocks/services/create-dedicated-bank-account.mock';
// import Customer from '../../../lib/payment/customer/customer';
// import { mockCustomer } from '../../../../../test/mocks/lib/customer.mock';

// describe('CreateUserService', () => {
//   let service: CreateUserService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         CreateUserService,
//         UserService,
//         LoginService,
//         DeviceService,
//         ProfileService,
//         CreateWalletService,
//         GenderService,
//         CreateDedicatedBankAccountService,
//         {
//           provide: 'Customer',
//           useClass: Customer,
//         }
//       ],
//     })
//     .overrideProvider(UserService)
//     .useValue(mockUserService)
//     .overrideProvider(NotificationService)
//     .useValue(mockNotificationService)
//     .overrideProvider(LoginService)
//     .useValue(mockLoginService)
//     .overrideProvider(ProfileService)
//     .useValue(mockProfileService)
//     .overrideProvider(DeviceService)
//     .useValue(mockDeviceService)
//     .overrideProvider(CreateWalletService)
//     .useValue(mockCreateWalletService)
//     .overrideProvider(GenderService)
//     .useValue(mockGenderService)
//     .overrideProvider(CreateDedicatedBankAccountService)
//     .useValue(mockCreateDedicatedBankAccountService)
//     .overrideProvider(Customer)
//     .useValue(mockCustomer)
//     .compile();

//     service = module.get<CreateUserService>(CreateUserService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
