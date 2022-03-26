import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserRole } from './components/user/enum/role.enum';
import { UserService } from './components/user/services/user.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {
    console.log('Running start up operations');
    this.setupRootAdminIfNoneExist();
  }

  getHello(): string {
    return 'Hello World!';
  }

  private async setupRootAdminIfNoneExist() {
    const result = await this.userService.find({
      query: {
        role: UserRole.ADMIN,
      },
      pagination: { take: 1, skip: 0 },
    });

    if (result.count) return;

    if (!process.env.ROOT_ADMIN_PASSWORD) {
      throw new Error('ROOT_ADMIN_PASSWORD is not set in the current environment');
    }

    await this.userService.create({
      firstName: 'Root',
      lastName: 'Admin',
      email: 'admin@customermanagement.com',
      password: process.env.ROOT_ADMIN_PASSWORD,
      role: UserRole.SUPERADMIN,
    });
  }
}
