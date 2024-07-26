import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('Authservice', () => {
  let authService;

  const mockUser: Partial<User> = {
    name: 'Bartolomiau',
    createdAt: '26/02/2024',
    password: 'password123',
    email: 'barto@gmail.com',
  };

  beforeEach(async () => {
    const mockUsersService = {
      findByEmail: () =>
        Promise.resolve({
          name: 'Bartolomiau',
          email: 'barto@gmail.com',
          createdAt: ' 20/02/2024',
          isAdmin: false,
          id: '234sdfwe-234asdf-sawd2342s',
        }),
      createUser: (user: Partial<User>): Promise<User> =>
        Promise.resolve({
          ...user,
          isAdmin: false,
          id: '234sdfwe-234asdf-sawd2342s',
        } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Creates an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it('SignUp() creates a new user in the DB the password must be encripted', async () => {
    const user = await authService.signUp(mockUser as User);

    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password);
  });
});
