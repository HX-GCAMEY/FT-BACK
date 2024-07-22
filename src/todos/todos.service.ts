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

  getTodos() {
    return this.todosDbRepository.find();
  }

  findById(id: number) {
    return this.todosDbRepository.findOneBy({ id });
  }

  createTodo(todo: Todo) {
    return this.todosDbRepository.save(todo);
  }
}
