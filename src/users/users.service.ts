import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject('API_USERS') private apiUsers: any,
  ) {}

  async getAllUsers() {
    //filtrar, limpiar, llamar a la DB
    const usersFromDB = await this.usersRepository.getUsers();

    return [...usersFromDB, ...this.apiUsers];
  }

  createUser(user: any) {
    return this.usersRepository.createUser(user);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }
}
