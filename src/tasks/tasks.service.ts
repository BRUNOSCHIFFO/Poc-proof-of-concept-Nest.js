import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
  private tasks: any[] = [];
  getTasks() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.tasks;
  }
  getTask(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const taskFound = this.tasks.find((task) => task.id === id);
    if (!taskFound) {
      return new NotFoundException(`Task with id ${id} not found`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return taskFound;
  }
  createTask(task: CreateTaskDto) {
    console.log(task);
    this.tasks.push({
      ...task,
      id: this.tasks.length + 1,
    });
    return task;
  }
  updateTask(task: UpdateTaskDto) {
    console.log(task);
    return 'actualizando tareas';
  }
  deleteTask() {
    return 'eliminando tareas';
  }
  updateTaskstatus() {
    return 'actualizando estado';
  }
}
