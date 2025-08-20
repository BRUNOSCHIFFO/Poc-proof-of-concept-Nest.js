import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto.js';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
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
  async getOne(IdIngresado: number) {
    const userFound = await this.prisma.user.findUnique({
      where: { id: IdIngresado },
    });
    if (!userFound) {
      throw new ConflictException(`User with id ${IdIngresado} not found`);
    }
    return userFound;
  }
  async update(IdIngresado: number, user: UpdateUserDto) {
    const userToUpdate = await this.prisma.user.update({
      data: { ...user },
      where: { id: IdIngresado },
    });
    if (!userToUpdate) {
      throw new ConflictException('error');
    }
    return userToUpdate;
  }
  async deleteUser(IdIngresado: number) {
    const userDelete = await this.prisma.user.delete({
      where: { id: IdIngresado },
    });
    if (!userDelete) {
      throw new ConflictException('error');
    }
    return 'user deleted succesfully';
  }
}
