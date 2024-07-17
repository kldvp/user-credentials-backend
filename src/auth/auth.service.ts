import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from '../db/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (user && !isValidPassword) {
      throw new UnauthorizedException();
    }
    const payload = { 
      email: user.email,
      name: user.name,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
