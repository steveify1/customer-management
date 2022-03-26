import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { UserRole } from "../../components/user/enum/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private allowedRoles: UserRole[] = []){}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if(!this.allowedRoles.includes(request.user?.role)) {
            throw new ForbiddenException("You do not have sufficient permission to perform this operation.");
        }
        return true;
    }
}