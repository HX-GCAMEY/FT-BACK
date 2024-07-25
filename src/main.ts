import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AuthGuard } from './guards/auth.guard';
import { BadRequestException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { config as Auth0Config } from './config/auth0';
// import { DateAdderInterceptor } from './users/interceptors/date-adder/date-adder.interceptor';
// import { loggerGlobal } from './middlewares/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(loggerGlobal);
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new DateAdderInterceptor())
  app.use(auth(Auth0Config));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          return { property: error.property, constraints: error.constraints };
        });
        return new BadRequestException({
          alert:
            'Se han detectado los siguientes errores en la peticion y te mandamos este mensaje personalizado',
          errors: cleanErrors,
        });
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
