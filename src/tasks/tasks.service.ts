import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from './dto-tasks/entity-tasks/tasks.entity';
import { CreateTasksDto } from './dto-tasks/tasks-create-dto';
import { UpdateTasksDto } from './dto-tasks/tasks-update-dto';
import { TasksModule } from './tasks.module';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Tasks)
        private taskRepository: Repository<Tasks>) {}
    
        get(): Promise<Tasks[]>{
            return this.taskRepository.find();
        }

        create(createTasksDto: CreateTasksDto){
            return this.taskRepository.save(createTasksDto);
        }

        async update(updateTasksDto: UpdateTasksDto, taskId: number, @Body('user_id') userId: number){
            try {
                if (taskId > 0) {
                  const task = await this.taskRepository.findOne({where: {id: taskId}});
                  if (!task) {
                    throw new HttpException('task Not Found', HttpStatus.BAD_REQUEST);
                  }
                  if (task.user_id !== userId) {
                    throw new HttpException('You don\'t have permission to update this task', HttpStatus.FORBIDDEN);
                  }
                  await this.taskRepository.update(taskId, updateTasksDto);                  
                  return { message: 'task updated Successfully' };
                }
                throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
              } catch (err) {
                throw err;
              }
            // return this.taskRepository.update(taskId, updateTasksDto);
        }

        getTask(taskId: number){
            return this.taskRepository.findOne({where: {id: taskId}});
        }

        async delete(taskId: number, @Body('user_id') userId: number){

            try {
                if (taskId > 0) {
                    const task = await this.taskRepository.findOne({where: {id: taskId}});
                    if (!task) {
                    throw new HttpException('task Not Found', HttpStatus.BAD_REQUEST);
                  }
                  if (task.user_id !== userId) {
                    throw new HttpException('You don\'t have permission to delete this task', HttpStatus.FORBIDDEN);
                  }
                  await this.taskRepository.delete(taskId);
                  return { message: 'task Deleted Successfully' };
                }
                throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
              } catch (err) {
                console.log(err);
                throw err;
              }

        }
}
