import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  HttpException,
  InternalServerErrorException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDetails } from '../dto/user-details.dto';

@Controller('users')
export class UsersController {
  constructor(
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
}
