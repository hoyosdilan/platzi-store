import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dtos';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'product 1',
      description: 'bla bla',
      price: 123,
      stock: 45,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((e) => e.id === id);
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = {
      id: ++this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  delete(id: number) {
    this.products.splice(
      this.products.findIndex((e) => e.id === id),
      1,
    );
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);

    const index = this.products.findIndex((e) => e.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }
}
