import { Injectable } from '@nestjs/common';
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

        update(updateTasksDto: UpdateTasksDto, taskId: number){
            return this.taskRepository.update(taskId, updateTasksDto);
        }

        getTask(taskId: number){
            return this.taskRepository.findOne({where: {id: taskId}});
        }

        delete(taskId: number){
            return this.taskRepository.delete(taskId);
        }
}
