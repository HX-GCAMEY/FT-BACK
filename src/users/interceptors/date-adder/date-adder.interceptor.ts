import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DateAdderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //logica del interceptor

    const now = new Date();

    console.log(now);

    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();

    const format = `${day}/${month}/${year}`; // '02/07/2024'

    const request = context.switchToHttp().getRequest();

    request.now = format;

    {
      now: '02/07/2024';
    }

    return next.handle();
  }
}
