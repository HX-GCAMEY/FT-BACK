import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

const ACCESS = 'clave123';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [
    TodosService,
    TodosRepository,
    {
      provide: 'ACCESS_TOKEN',
      useValue: ACCESS,
    },
  ],
})
export class TodosModule {}
