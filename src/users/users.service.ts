import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDetails } from '../dto/user-details.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // async create(createUserDto: UserDetails): Promise<User> {
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

  //   const createdUser = new this.userModel({
  //     email: createUserDto.email,
  //     password: hashedPassword,
  //   });
  //   return createdUser.save();
  // }

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
}
