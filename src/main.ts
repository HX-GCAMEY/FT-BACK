import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';
// import { DateAdderInterceptor } from './users/interceptors/date-adder/date-adder.interceptor';
// import { loggerGlobal } from './middlewares/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(loggerGlobal);
  app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new DateAdderInterceptor())

  await app.listen(3000);
}
bootstrap();
