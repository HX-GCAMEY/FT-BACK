import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: Partial<User>) {
    // email / password - > encriptada

    const hashedPassword = await bcrypt.hash(user.password, 10);

    return await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string) {
    const foundUser = await this.usersRepository.findOneBy({ email: email });

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
