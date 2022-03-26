import { Repository } from "typeorm";
import { MockType } from "../../../src/shared/interfaces/object-literal.interface";


export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
    // ...
  }));