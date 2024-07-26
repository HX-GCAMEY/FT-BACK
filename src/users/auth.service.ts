import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: Partial<User>) {
    // email / password - > encriptada

    const hashedPassword = await bcrypt.hash(user.password, 10);

    return await this.usersService.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string) {
    const foundUser = await this.usersService.findByEmail(email);

    if (!foundUser) {
      throw new BadRequestException('Invalid Credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Credentials');
    }

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'User logged in succesfully',
      token,
    };
  }
}
