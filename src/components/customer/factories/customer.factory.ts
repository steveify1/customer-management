import { Customer } from "../entities/customer.entity";
import { CreateCustomerData } from "../interfaces/customer.interface";

export class CustomerFactory {
    static create(data: CreateCustomerData): Customer {
        const customer = new Customer();

        for (const [key, value] of Object.entries(data)) {
            customer[key] = value;
        }
        
        return customer;
    }    
}
