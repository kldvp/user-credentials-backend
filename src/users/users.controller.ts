import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDetails } from '../dto/user-details.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
