import { 
    Controller, 
    Post, 
    Body,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDetails } from '../dto/user-details.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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
