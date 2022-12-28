import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create-dto';
import { UpdateUserDto } from './dto/user-update-dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  getUser(){
    return this.userService.get();
  }

  @Post()
  store(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);

  }
  
  @Patch('/:userId')
  update(
    @Body() updateUserDto: UpdateUserDto, 
    @Param('userId', ParseIntPipe) userId: number){
    return this.userService.update(updateUserDto,userId);    

  }

  @Get('/:userId')
  getUserId(@Param('userId', ParseIntPipe) userId: number){
    return this.userService.getUser(userId);
  }
  
  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number){
    return  this.userService.delete(userId);
  }

}
