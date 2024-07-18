import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  HttpException,
  InternalServerErrorException,
  Inject,
  Injectable,
  Scope,
  UseGuards
} from '@nestjs/common';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserDetails } from '../dto/user-details.dto';
import { isPasswordValid } from '../utils/utils';


@Controller('users')
@Injectable({ scope: Scope.REQUEST })
export class UsersController {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly userService: UsersService,
  ) { }

  /**
   * Route: User register
   * - User can create account using email, name & password
   * - Upon successful creation, it will return created user
  */
  @Post('signup')
  async register(@Body() body: UserDetails) {
    const { email, name, password } = body;
    // client side validations
    if (!email) {
      throw new HttpException(
        'Email is required',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if (!isPasswordValid(password)) {
      throw new HttpException(
        'Password is required and must be 8 characters minimum, with at least one letter, one number, and one special character',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const isExists = await this.userService.findOne(email);
    if (isExists) {
      throw new HttpException(
        `User already registered.`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    let createdUser = await this.userService.createUser(email, name, password);
    if (!createdUser) throw new InternalServerErrorException();
    createdUser = createdUser.toJSON();
    return { name: createdUser.name, email: createdUser.email };
  }

  /**
   * Route: User login
   * - User can login using email & password
   * - Password will be checked against encrypted password from db
   * - If password doesn't match with saved one, throws unauthorized exeception. 
  */
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() body: any) {
    const { email, password } = body;
    const result = await this.userService.signIn(email, password);
    return result;
  }


  /**
   * Route: User details
   * - Protected route, only accessed by authorized access token
   * - Provide user details based on access token
  */
  @UseGuards(AuthGuard)
  @Get('profile')
  async getAllMyUploadedPictures() {
    let user = this.request['user'];
    if (!user) {
      throw new HttpException(
        `User data not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    user = user.toJSON();
    return { data: { name: user.name || 'User', email: user.email }, code: HttpStatus.OK };
  }
}
