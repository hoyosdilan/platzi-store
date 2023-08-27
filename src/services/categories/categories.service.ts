import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dtos';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoriesService {
  private idCounter = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'food',
      description: 'description food',
    },
  ];

  getAll() {
    return this.categories;
  }

  getOne(id: number) {
    const category = this.categories.find((e) => e.id === id);
    if (!category)
      throw new NotFoundException(`Not category with id ${id} found`);

    return category;
  }

  create(payload: CreateCategoryDto) {
    const category = {
      id: ++this.idCounter,
      ...payload,
    };

    this.categories.push(category);
    return category;
  }

  delete(id: number) {
    this.categories.splice(
      this.categories.findIndex((e) => e.id === id),
      1,
    );
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.getOne(id);

    const index = this.categories.findIndex((e) => e.id === id);
    this.categories[index] = {
      ...category,
      ...payload,
    };
    return this.categories[index];
  }
}
