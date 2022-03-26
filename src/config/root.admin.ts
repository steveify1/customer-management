import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UserService } from "../components/user/services/user.service";

@Injectable()
export class RootAdmin {
  constructor(
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    @Inject(forwardRef(() => UserService)) private readonly genderService: UserService,
  ) {}

  
}
