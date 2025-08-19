import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

//es para definir una función que proteja a otra función siempre y cuando cumpla una lógica

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(request.url);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (request.url === '/greetcorrectoguard') return false;

    return true;
  }
}
