import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAllUsers() {
    //filtrar, limpiar, llamar a la DB
    return 'Todos los usuarios';
  }
}
