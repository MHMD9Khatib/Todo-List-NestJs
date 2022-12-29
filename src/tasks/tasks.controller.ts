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
     update(@Body() updateTasksDto: UpdateTasksDto, 
     @Param('taskId', ParseIntPipe) taskId:number, @Body('user_id') userId: number){
        return this.tasksService.update(updateTasksDto, taskId, userId);
    }

    @Get('/:taskId')
    getTaskId(@Param('taskId', ParseIntPipe) taskId:number){
        return this.tasksService.getTask(taskId);
    }

    @Delete('/:taskId')
    deleteTask(@Param('taskId', ParseIntPipe) taskId:number, @Body('user_id') userId: number){
        return  this.tasksService.delete(taskId, userId);

    }
}
