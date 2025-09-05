import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Controller('/tasks')
export class TaskController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(@Query() query: any) {
    console.log(query);
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getOneTask(@Param('id') id: string) {
    return this.tasksService.getOneTask(parseInt(id));
  }

  @Post()
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    return this.tasksService.updateTask(parseInt(id), task);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(parseInt(id));
  }

  @Patch('/:id/status')
  updateSatusTask() {
    return this.tasksService.updatestatusTask();
  }
}
