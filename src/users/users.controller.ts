import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.usersService.getOne(parseInt(id));
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(parseInt(id), user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(parseInt(id));
  }
}
