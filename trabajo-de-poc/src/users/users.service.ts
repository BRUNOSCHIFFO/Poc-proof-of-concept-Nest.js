import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UsersService {
  private users: any[] = [
    {
      id: 1,
      name: 'joee',
      phone: '12344555',
    },
    {
      id: 2,
      name: 'darlon',
      phone: '1222233333555',
    },
  ];
  getUsers() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.users;
  }

  createUser(user: CreateUserDto) {
    this.users.push(user);
    return {
      ...user,
      id: this.users.length + 1,
    };
  }
}
