import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosDbRepository: Repository<Todo>,
  ) {}

  async getTodos() {
    return await this.todosDbRepository.find();
  }

  async findById(id: number) {
    return await this.todosDbRepository.findOneBy({ id });
  }

  async createTodo(todo: Todo) {
    return await this.todosDbRepository.save(todo);
  }
}
