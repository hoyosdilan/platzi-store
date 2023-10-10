import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dtos';
import { Order } from 'src/users/entities/order.entity';
import { User } from '../entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  private idCount = 1;
  private orders: Order[] = [
    {
      id: 1,
      date: '12/12/32',
      user: {
        id: 1,
        name: 'name user',
        username: 'username',
        password: 'password',
        email: 'email@email.com',
      } as User,
      products: [
        {
          id: 1,
          name: 'product 1',
          description: 'bla bla',
          price: 123,
          stock: 45,
          image: '',
        } as Product,
      ],
    },
  ];

  getAll() {
    return this.orders;
  }

  getOne(id: number) {
    const order = this.orders.find((e) => e.id === id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
  }

  create(payload: CreateOrderDto) {
    const order = {
      id: ++this.idCount,
      ...payload,
    };
    this.orders.push(order);
    return order;
  }

  delete(id: number) {
    this.orders.splice(this.orders.findIndex((e) => e.id === id));
  }

  update(id: number, payload: UpdateOrderDto) {
    const order = this.getOne(id);

    const index = this.orders.findIndex((e) => e.id === id);
    this.orders[index] = {
      ...order,
      ...payload,
    };
    return this.orders[index];
  }
}
