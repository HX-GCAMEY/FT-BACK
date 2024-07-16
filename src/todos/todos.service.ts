import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  findAll() {
    return `This action returns all todos`;
  }
}
