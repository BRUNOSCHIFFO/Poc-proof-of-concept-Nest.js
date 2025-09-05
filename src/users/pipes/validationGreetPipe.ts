import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { GreetQueryDto } from '../dto/greet-query-user.dto.js';

export interface ValidatedGreetQuery {
  name: string;
  email: string;
}
function isEmail(email: string): boolean {
  // Expresión regular simple para validar email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

@Injectable()
export class ValidateGreetPipe
  implements PipeTransform<GreetQueryDto, ValidatedGreetQuery>
{
  transform(value: GreetQueryDto): ValidatedGreetQuery {
    console.log('value', value);
    if (!isEmail(value.email)) {
      throw new HttpException(
        'email must be a valid email',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { ...value };
  }
}
