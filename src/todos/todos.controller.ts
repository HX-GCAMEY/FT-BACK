import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './files.service';

@Controller('todos')
export class TodosController {
  constructor(
    private todosService: TodosService,
    private filesService: FileService,
  ) {}

  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }

  @Post()
  createTodo(@Body() todo: any) {
    return this.todosService.createTodo(todo);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const todo = await this.todosService.findById(id);

    return this.filesService.saveFile(
      file.originalname,
      file.mimetype,
      file.buffer,
      todo,
    );
  }

  @Get(':id')
  getTodoById(@Param('id') id: number) {
    return `Este es el todo con id ${id}`;
  }
}
