import { Product } from 'src/products/entities/product.entity';
import { User } from './user.entity';

export class Order {
  id: number;
  user: User;
  date: string;
  products: Product[];
}
