import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dtos';
import { User } from 'src/entities/user.entity';

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

  getAll() {
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
}
