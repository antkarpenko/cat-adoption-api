import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Cat } from '../cats/cat.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['favorites'],
    });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

   async remove(id: string): Promise<void> {
     const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
  }

  async count(): Promise<number> {
    return this.userRepository.count();
  }

  async addToFavorites(user: User, cat: Cat): Promise<Cat[]> {
    if (Array.isArray(user.favorites)) {
        user.favorites.push(cat);
    } else {
        user.favorites = [cat];
    }

    await this.userRepository.save(user);
    return this.getFavorites(user.id)
  }

  async removeFromFavorites(user: User, cat: Cat): Promise<Cat[]> {
    if (Array.isArray(user.favorites)) {
      user.favorites = user.favorites.filter(favorite => favorite.id !== cat.id);
    }

    await this.userRepository.save(user);
    return this.getFavorites(user.id)
  }

  async getFavorites(id: number): Promise<Cat[]> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.favorites;
  }


}