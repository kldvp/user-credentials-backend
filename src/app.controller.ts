import { 
  Controller, 
  Get
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
}


