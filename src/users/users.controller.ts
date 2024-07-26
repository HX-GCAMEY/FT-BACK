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
  // Headers,
  UseGuards,
  UseInterceptors,
  // ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  HttpException,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { DateAdderInterceptor } from './interceptors/date-adder/date-adder.interceptor';
import { UsersBodyDTO } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { AuthService } from './auth.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles.enum';
import { RolesGuard } from '../guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService,
  ) {}

  @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAdmin() {
    return 'Ruta exclusiva para administradores';
  }

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

  @Post('/signup')
  @UseInterceptors(DateAdderInterceptor)
  createUser(@Body() user: UsersBodyDTO, @Req() request) {
    const modifiedUser = { ...user, createdAt: request.now };

    return this.authService.signUp(modifiedUser);
  }

  @Post('/signin')
  userSignIn(@Body() credentials: any) {
    const { email, password } = credentials;

    return this.authService.signIn(email, password);
  }

  @Put()
  @UseGuards(AuthGuard)
  updateUser() {
    return 'Esta ruta actualiza un usuario';
  }

  @Get('auth0/protected')
  getAuth0(@Req() request: any) {
    return JSON.stringify(request.oidc.user);
  }

  @Put()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  upgradeToAdmin() {}

  @Delete()
  deleteUser() {
    try {
      throw new Error();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.I_AM_A_TEAPOT,
          error: 'Soy una Tetera',
        },
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
  }

  @All('generica')
  generica() {
    return 'Yo hago de todo';
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() request) {
    return request.user;
  }

  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  uploadProfileImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 300000,
            message: 'The size must be 300kb max',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.cloudinaryService.uploadImage(file);
  }

  @Get(':id') // users/5
  @UsePipes(new ValidationPipe({ transform: true }))
  getUserById(@Param('id') id: string) {
    // console.log(typeof id);
    // return 'busco por id';
    return this.usersService.getUserById(id);
  }
}
