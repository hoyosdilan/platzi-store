import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dtos';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class BrandsService {
  private idCounter = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'apple',
      country: 'us',
    },
  ];

  getAll() {
    return this.brands;
  }

  getOne(id: number) {
    const brand = this.brands.find((e) => e.id === id);
    if (!brand)
      throw new NotFoundException(`brand with id ${id} was not found`);
    return brand;
  }

  create(payload: CreateBrandDto) {
    const brand = {
      id: ++this.idCounter,
      ...payload,
    };
    this.brands.push(brand);
    return brand;
  }

  delete(id: number) {
    this.brands.splice(
      this.brands.findIndex((e) => e.id === id),
      1,
    );
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.getOne(id);

    const index = this.brands.findIndex((e) => e.id === id);
    this.brands[index] = {
      ...brand,
      ...payload,
    };
    return this.brands[index];
  }
}
