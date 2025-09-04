import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { HelloController } from './hello/hello.controller';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [PrismaService],
  imports: [TasksModule, UsersModule, PrismaModule],
  controllers: [HelloController],
  exports: [PrismaService],
})
export class AppModule {}
