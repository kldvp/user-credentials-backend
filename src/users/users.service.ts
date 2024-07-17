import { 
  Injectable, 
  HttpStatus,
  UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,

  ) {}

  async createUser(email: string, name: string, password: string): Promise<User | undefined> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new this.userModel({
      email: email,
      name,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.findOne(email);
    if (!user) throw new UnauthorizedException();
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (user && !isValidPassword) {
      throw new UnauthorizedException();
    }
    const payload = {
      email: user.email,
      name: user.name,
    };
    return {
      code: HttpStatus.OK,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
