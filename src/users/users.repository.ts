import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,
      name: 'Bartolomaiu',
      email: 'barto@gmail.com',
    },
    {
      id: 2,
      name: 'Tota',
      email: 'tots@gmail.com',
    },
    {
      id: 3,
      name: 'Milaneso',
      email: 'milaneso@gmail.com',
    },
  ];

  async getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === +id);
  }

  createUser(user: any) {
    const id = this.users.length + 1;
    this.users.push({ id, ...user });
    return user;
  }
}
