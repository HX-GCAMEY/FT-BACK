import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Bearer token not found');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret }); //{payload, exp, iat}

      payload.exp = new Date(payload.exp * 1000);
      payload.iat = new Date(payload.iat * 1000);

      if (payload.isAdmin) {
        payload.roles = ['admin'];
      } else {
        payload.roles = ['user'];
      }

      request.user = payload;

      return true;
    } catch (error) {}
    throw new UnauthorizedException('Invalid token');
  }
}
