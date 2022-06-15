import { UserDto } from './dto/user.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/createUser')
  public createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get('/verify/:userId')
  public async verifyUser(@Param('userId') userId: string) {
    return this.userService.verifyUser(userId);
  }
}
