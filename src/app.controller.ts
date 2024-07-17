import { 
  Controller, 
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './db/user.service';
import { UserDetails } from './dto/user-details.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

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

    const createdUser = await this.userService.createUser(email, name, password);
    return createdUser;
  }
}


