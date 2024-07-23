import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { File } from './entities/fileUpload.entity';
import { FileService } from './files.service';

const ACCESS = 'clave123';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, File])],
  controllers: [TodosController],
  providers: [
    TodosService,
    FileService,
    TodosRepository,
    {
      provide: 'ACCESS_TOKEN',
      useValue: ACCESS,
    },
  ],
})
export class TodosModule {}
