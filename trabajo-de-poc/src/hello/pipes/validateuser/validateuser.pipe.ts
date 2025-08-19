import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { GreetQueryDto } from 'src/hello/dto/greet-query.dto';

export interface ValidatedQuery {
  name: string;
  age: number; // Ya transformado a number
}

@Injectable()
export class ValidateuserPipe
  implements PipeTransform<GreetQueryDto, ValidatedQuery>
{
  transform(value: GreetQueryDto): ValidatedQuery {
    console.log('value', value);
    const ageNumber = parseInt(value.age, 10);
    if (isNaN(ageNumber)) {
      throw new HttpException('age must be a number', HttpStatus.BAD_REQUEST);
    }
    return { ...value, age: ageNumber };
  }
}
