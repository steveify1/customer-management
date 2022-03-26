export interface CreateUserInput {
    email: string;
    firstName: string;
    lastName: string;
    phoneCode?: string;
    phoneNumber?: string;
    password: string;
    role?: string;
}

export interface CreateUserData {
    email: string;
    firstName: string;
    lastName: string;
    phoneCode?: string;
    phoneNumber?: string;
    password: string
    role: string;
}
