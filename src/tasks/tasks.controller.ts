import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateTasksDto } from './dto-tasks/tasks-create-dto';
import { UpdateTasksDto } from './dto-tasks/tasks-update-dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor( private tasksService: TasksService){}

    @Get()
    getTasks(){
        return this.tasksService.get();
    }

    @Post()
    AddTask(@Body() createTasksDto: CreateTasksDto){
        return this.tasksService.create(createTasksDto);
    }

    @Patch('/:taskId')
    async update(@Body() updatrTasksDto: UpdateTasksDto, @Param('taskId', ParseIntPipe) taskId:number , @Body('user_id') userId: number){
        try {
            if (taskId > 0) {
              const task = await this.tasksService.getTask(taskId);
              if (!task) {
                throw new HttpException('task Not Found', HttpStatus.BAD_REQUEST);
              }
              if (task.user_id !== userId) {
                throw new HttpException('You don\'t have permission to update this task', HttpStatus.FORBIDDEN);
              }
              await this.tasksService.update(updatrTasksDto, taskId);
              return { message: 'task updated Successfully' };
            }
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          } catch (err) {
            throw err;
          }
    }

    @Get('/:taskId')
    getTaskId(@Param('taskId', ParseIntPipe) taskId:number){
        return this.tasksService.getTask(taskId);
    }

    @Delete('/:taskId')
    async deleteTask(@Param('taskId', ParseIntPipe) taskId:number, @Body('user_id') userId: number){
         try {
      if (taskId > 0) {
        const task = await this.tasksService.getTask(taskId);
        if (!task) {
          throw new HttpException('task Not Found', HttpStatus.BAD_REQUEST);
        }
        if (task.user_id !== userId) {
          throw new HttpException('You don\'t have permission to delete this task', HttpStatus.FORBIDDEN);
        }
        await this.tasksService.delete(taskId);
        return { message: 'task Deleted Successfully' };
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    } catch (err) {
      console.log(err);
      throw err;
    }
    }
}
