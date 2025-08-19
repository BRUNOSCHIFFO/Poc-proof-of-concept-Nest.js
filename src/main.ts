import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //el useGlobalPipes(new ValidationPipe... se usa para que funcionen globalmente los DTOs(es decir sanitizar las entradas como por ej que un campo mail tenga @, o max y min)
  // el whitelist: true sirve para no poder agregar campos al Post, ignorandolos si no están en la clase del DTO
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});
