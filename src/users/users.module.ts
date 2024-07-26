import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CloudinaryConfig } from '../config/cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { AuthService } from './auth.service';
import { requiresAuth } from 'express-openid-connect';

// const mockUsersService = {
//   getAllUsers() {
//     return ' Este es el servicio mock de users';
//   },
// };

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    // {
    //   provide: UsersService,
    //   useValue: mockUsersService,
    // },
    UsersService,
    CloudinaryConfig,
    CloudinaryService,
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
    AuthService,
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requiresAuth()).forRoutes('users/auth0/protected');
  }
}
