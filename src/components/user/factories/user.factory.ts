import { User } from "../entities/user.entity";
import { CreateUserData } from "../interfaces/user.interface";
import { computePhonenumber } from "../utils/string.utils";

export class UserFactory {
    static create(data: CreateUserData): User {
        const user = new User();

        for (const [key, value] of Object.entries(data)) {
            user[key] = value;
        }
        
        return user;
    }

    static generateJwt ({ id, firstName, lastName, role }: User){
        return {
            id, firstName, lastName, role,
        }
    }    
}
