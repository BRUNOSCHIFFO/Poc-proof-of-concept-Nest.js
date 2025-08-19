import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { HelloController } from './hello/hello.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TasksModule, UsersModule, PrismaModule],
  controllers: [HelloController],
})
export class AppModule {}
