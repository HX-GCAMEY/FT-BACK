import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  createUser() {
    // Extraer al user del req.body o query o params
    const user = {
      name: 'Bartolomiau',
      phone: 123123423,
    };
    return this.usersService.createUser(user);
  }
}
