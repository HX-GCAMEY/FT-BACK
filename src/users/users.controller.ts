import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Req,
  Res,
  HttpStatus,
  All,
  Param,
  // Query,
  Body,
  Headers,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { DateAdderInterceptor } from './interceptors/date-adder/date-adder.interceptor';

@Controller('users')
// @UseInterceptors(DateAdderInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // getAllUsers(@Query('name') name: string) {
  //   if (name) {
  //     return name;
  //   }

  //   return this.usersService.getAllUsers();
  // }

  @HttpCode(418)
  @Get('coffe')
  makeCoffe() {
    return 'No puedo preparar cafe! Soy una tetera!';
  }

  @Get('message')
  getMessage(@Req() request: Request, @Res() response: Response) {
    console.log(request);
    console.log(response);
    response.status(HttpStatus.FORBIDDEN).send('este es un mensaje');
  }

  @Post()
  @UseInterceptors(DateAdderInterceptor)
  createUser(@Body() user: any, @Req() request) {
    const modifiedUser = { ...user, createdAt: request.now };

    return this.usersService.createUser(modifiedUser);
  }

  @Put()
  @UseGuards(AuthGuard)
  updateUser() {
    return 'Esta ruta actualiza un usuario';
  }

  @Delete()
  deleteUser() {
    return 'Esta ruta elimina un usuario';
  }

  @All('generica')
  generica() {
    return 'Yo hago de todo';
  }

  @Get('profile')
  getProfile(@Headers('token') token: string) {
    if (token !== '1234') {
      return 'No tienes acceso';
    }
    return 'Este es el perfil del usuario';
  }

  @Get(':id') // users/5
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
