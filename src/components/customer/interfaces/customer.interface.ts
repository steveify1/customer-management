export interface CreateCustomerInput {
    email: string;
    firstName: string;
    lastName: string;
    genderId: number;
}

export interface UpdateCustomerInput {
    email?: string;
    firstName?: string;
    lastName?: string;
    genderId?: number;
}

export interface CreateCustomerData {
    email: string;
    firstName: string;
    lastName: string;
    genderId?: number;
    creatorId: number;
}
