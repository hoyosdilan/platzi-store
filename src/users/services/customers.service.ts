import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dtos';
import { Customer } from 'src/users/entities/customer.entity';

@Injectable()
export class CustomersService {
  private idOrders = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'AntonioCustomer',
      age: 43,
    },
  ];

  getAll() {
    return this.customers;
  }

  getOne(id: number) {
    const customer = this.customers.find((e) => e.id === id);
    if (!customer)
      throw new NotFoundException(`Not customer with id ${id} found`);
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const customer = {
      id: ++this.idOrders,
      ...payload,
    };
    this.customers.push(customer);
    return customer;
  }

  delete(id: number) {
    this.customers.splice(
      this.customers.findIndex((e) => e.id === id),
      1,
    );
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.getOne(id);

    const index = this.customers.findIndex((e) => e.id === id);
    this.customers[index] = {
      ...customer,
      ...payload,
    };
    return this.customers[index];
  }
}
