import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { LoggerMiddleware } from './middlewares/logger';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { DateAdderInterceptor } from './users/interceptors/date-adder/date-adder.interceptor';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [UsersModule, TodosModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },

    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass:DateAdderInterceptor
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
