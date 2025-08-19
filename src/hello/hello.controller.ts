import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';
import type { ValidatedQuery } from './pipes/validateuser/validateuser.pipe';
import { AuthGuard } from './guards/auth/auth.guard.js';

@Controller()
export class HelloController {
  @Get('/hello')
  index(@Req() request: Request, @Res() response: Response) {
    console.log(request.url);
    response.status(200).json({
      message: 'hello world',
    });
  }

  //USO DE PIPES:
  @Get('ticket/:num')
  getNumber(@Param('num') num: number) {
    console.log(typeof num); //DEVUELVE STRING
    return num + 14; // NO FUNCIONA. Se concatena num con 14, por ej si envio 10 por la url, retornaría 1014 y no (10 + 14)
  }

  @Get('ticketcorrecto/:num')
  getNumberCorrecto(@Param('num', ParseIntPipe) num: number) {
    console.log(typeof num); //DEVUELVE number
    return num + 14; //ParseIntPipe lo transforma en entero al string recibido de la url, que se almacenara en la variable num
  }

  @Get('active/:status')
  isUserActive(@Param('status') status: boolean) {
    console.log(typeof status); //DEVUELVE string
    return status; //Muestra true o false pero es string.
  }

  @Get('activecorrecto/:status')
  isUserActiveCorrecto(@Param('status', ParseBoolPipe) status: boolean) {
    console.log(typeof status); //DEVUELVE boolean
    return status; //Muestra true o false pero es boolean.
  }

  @Get('greet')
  greet(@Query() query: { name: string; age: number }) {
    console.log(typeof query.name); //DEVUELVE string
    console.log(typeof query.age); //DEVUELVE string
    return `Hello ${query.name}, you are ${query.age} years old`; //se muestra bien
  }

  @Get('greetcorrecto')
  greetCorrecto(@Query(ValidateuserPipe) query: ValidatedQuery) {
    console.log(typeof query.name); //DEVUELVE string
    console.log(typeof query.age); //DEVUELVE number
    return `Hello ${query.name}, you are ${query.age} years old`; //se muestra bien
  }

  //usando GUARDS como componente de seguridad que funciona como un "filtro de acceso"

  @Get('greetcorrectoguard')
  @UseGuards(AuthGuard) //GUARD
  greetCorrectoguard(@Query(ValidateuserPipe) query: ValidatedQuery) {
    console.log(typeof query.name); //DEVUELVE string
    console.log(typeof query.age); //DEVUELVE number
    return `Hello ${query.name}, you are ${query.age} years old`; //se muestra bien
  }
}
