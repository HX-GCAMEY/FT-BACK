import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

function validateRequest(request) {
  //valido el token y dertermino si accede o no (devuelvo un booleano)
  const token = request.headers['token'];
  return token === '1234';
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return validateRequest(request);
  }
}
