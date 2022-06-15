import { MailService } from './../mail/send_email.service';
import { UserDto } from './dto/user.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import {validateEmail} from '../helpers/validation'
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private mailService: MailService,
  ) {}

  public async createUser(newUser: UserDto): Promise<object> {
    try {
      const {email,userName,expireAt}=newUser;
      if(!validateEmail(email)){
        return {
          message: 'Invalid email'
        };
      }
      const checkEmail = await this.userModel.findOne({
        email: email
      });
 
      if (checkEmail) {
        return {
          message: 'User already exist'
        };
      }
      const expireTime = Date.now() + parseInt(expireAt) * 60 * 1000;
      const user = {
        userName: userName,
        email: email,
        expireAt: expireTime,
        verified: false,
      };
      const savedUser = await new this.userModel(user).save();
      this.mailService.sendMail(savedUser);
      return {
        message: `An email verification link has been send to ${email}`,
        user: savedUser,
      };
    } catch (error) {
      return error.message;
    }
  }

  public async verifyUser(userId: string): Promise<object> {
    try {
      const user = await this.userModel.findOne({
        _id: userId,
        expireAt: { $gt: Date.now() },
      });
      if (!user) {
        return {
          message: 'This link has been expired or Invalid'
      };
      } else {
        await this.userModel.findByIdAndUpdate(
          { _id: userId },
          { $set: { verified: true,expireAt:Date.now()} },
          { new: true },
        );
      }
      return {
        message: 'You are successfully Verified',
        user: { userName: user.userName },
      };
    } catch (error) {
      return error.message;
    }
  }
}
