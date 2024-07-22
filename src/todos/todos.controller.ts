import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }

  @Post()
  createTodo(@Body() todo: any) {
    return this.todosService.createTodo(todo);
  }

  @Get(':id')
  getTodoById(@Param('id') id: number) {
    return `Este es el todo con id ${id}`;
  }
}
