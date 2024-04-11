import { Injectable } from '@nestjs/common';
import { Cat } from './cat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CatPayload } from './interfaces';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  create(cat: CatPayload) {
    return this.catsRepository.save(new Cat(cat));
  }

  async update(id: number, cat: CatPayload) {
    await this.catsRepository.update(id, cat);
    return this.findOne(id);

  }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat | null> {
    return this.catsRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }
}