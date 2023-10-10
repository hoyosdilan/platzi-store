import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';
import { User } from 'src/users/entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private idCount = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'name user',
      username: 'username',
      password: 'password',
      email: 'email@email.com',
    },
  ];

  constructor(
    private productService: ProductsService,
    private configService: ConfigService,
  ) {}

  getAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');

    console.log(apiKey, dbName);

    return this.users;
  }

  getOne(id: number) {
    const user = this.users.find((e) => e.id === id);
    if (!user) throw new NotFoundException(`user with id ${id} not found`);

    return user;
  }

  create(payload: CreateUserDto) {
    const user = {
      id: ++this.idCount,
      ...payload,
    };

    this.users.push(user);
    return user;
  }

  delete(id: number) {
    this.users.splice(
      this.users.findIndex((e) => e.id === id),
      1,
    );
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.getOne(id);

    const index = this.users.findIndex((e) => e.id === id);
    this.users[index] = {
      ...user,
      ...payload,
    };
    return this.users[index];
  }

  getOrdersByUser(id: number): Order {
    const user = this.getOne(id);
    return {
      date: '12/4/2009',
      user,
      products: this.productService.findAll(),
    } as Order;
  }
}
