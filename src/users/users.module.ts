import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

// const mockUsersService = {
//   getAllUsers() {
//     return ' Este es el servicio mock de users';
//   },
// };

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    // {
    //   provide: UsersService,
    //   useValue: mockUsersService,
    // },
    UsersService,
    UsersRepository,
    {
      provide: 'API_USERS',
      useFactory: async () => {
        const apiUsers = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        ).then((response) => response.json());

        const cleanUsers = apiUsers.map((user) => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        });

        return cleanUsers;
      },
    },
  ],
})
export class UsersModule {}
