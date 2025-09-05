import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTasks() {
    return await this.prisma.task.findMany();
  }

  async getOneTask(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async createTask(task: CreateTaskDto) {
    try {
      return await this.prisma.task.create({ data: task });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Task with this title already exists');
      }
      throw error;
    }
  }

  async updateTask(id: number, task: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data: { ...task },
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async deleteTask(id: number) {
    try {
      const deletedTask = await this.prisma.task.delete({
        where: { id },
      });
      return deletedTask;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      throw error;
    }
  }

  updatestatusTask() {
    return 'actualizando estado';
  }
}
