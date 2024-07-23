import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user: User) {
    return await this.usersRepository.save(user);
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email: email });
  }
}
