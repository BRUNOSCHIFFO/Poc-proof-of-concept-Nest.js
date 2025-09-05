import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto.js';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany({
      include: { tasks: true },
    });
  }

  async getOneUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  async createUser(user: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    return await this.prisma.user.create({ data: user });
  }

  async updateUser(id: number, user: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { ...user },
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async deleteUser(id: number) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id },
      });
      return deletedUser;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
