import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
  IsEmpty,
} from 'class-validator';

export class UsersBodyDTO {
  id: string;
  createdAt?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail() // asd@as.as
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsEmpty()
  isAdmin?: boolean;
}
