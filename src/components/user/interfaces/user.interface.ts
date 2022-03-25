export interface CreateUserInput {
    email: string;
    firstName: string;
    lastName: string;
    phoneCode?: string;
    phoneNumber?: string;
    genderId?: string;
    dob?: Date | string;
}

export interface CreateUserData {
    email: string;
    firstName: string;
    lastName: string;
    phoneCode?: string;
    phoneNumber?: string;
    genderId?: string;
    paymentGatewayCustomerCode?: string;
    password: string
    isVerified?: boolean;
    socialAuthKey?: string;
    role: string;
}
