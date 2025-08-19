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
  getallTasks(@Query() query: any) {
    console.log(query);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getallTask(@Param('id') id: string) {
    console.log(id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.tasksService.getTask(parseInt(id));
  }

  @Post()
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Put()
  updateTask(@Body() task: UpdateTaskDto) {
    return this.tasksService.updateTask(task);
  }

  @Delete()
  deleteTask() {
    return this.tasksService.deleteTask();
  }

  @Patch()
  updateTaskstatus() {
    return this.tasksService.updateTaskstatus();
  }
}
