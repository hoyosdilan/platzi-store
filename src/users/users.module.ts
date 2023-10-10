import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [CustomersController, OrdersController, UsersController],
  providers: [CustomersService, OrdersService, UsersService],
  imports: [ProductsModule],
})
export class UsersModule {}
