import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerMiddleware } from './logger/logger.middleware.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users'); //acá puedo cambiar la ruta de 'users' para que sea alguna en especifica solamente, ej si quiero solo el get. forRoutes({ path: '/users', method: RequestMethod.GET}).
    // Acá van
  }
}
