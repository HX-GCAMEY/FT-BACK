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
    //Limpio al usuario y me quedo con el nombre unicamente

    const newUser = user.name;

    return this.usersRepository.createUser(newUser);
  }
}
