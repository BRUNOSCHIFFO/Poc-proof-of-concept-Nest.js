import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ValidateGreetPipe } from './pipes/validationGreetPipe.js';
import { GreetAuthGuard } from './guards/auth/greet.guard.js';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/greet')
  @UseGuards(GreetAuthGuard)
  greet(@Query(ValidateGreetPipe) query: { name: string; email: string }) {
    return 'Hello ' + query.name + ', your email is: ' + query.email;
  }

  @Get('/:id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOneUser(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Put('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
