import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';

const ACCESS = 'clave123';

@Module({
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
