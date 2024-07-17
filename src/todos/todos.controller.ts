import { Controller, Get, Inject } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    @Inject('ACCESS_TOKEN') private accessToken: string,
  ) {}

  @Get()
  findAll() {
    return this.accessToken === 'clave123'
      ? this.todosService.findAll()
      : 'No tienes acceso';
  }
}
