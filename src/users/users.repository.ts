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

  async createUser(user: any) {
    //contacto a la DB o unaA API
    // ejecuta la query
    console.log(user);

    //   const user = fetch('urlde usuarios');
    // }
  }
}
