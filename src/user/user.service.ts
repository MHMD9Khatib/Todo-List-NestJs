import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./dto/entity/user.entity";
import { CreateUserDto } from "./dto/user-create-dto";
import { UpdateUserDto } from "./dto/user-update-dto";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User> ){}


    get(): Promise<User[]>{
        return this.userRepository.find();
    }

    create(createUserDto: CreateUserDto){
        return this.userRepository.save(createUserDto);
    }

    update( updateUserDto: UpdateUserDto , userId: number ){
        return this.userRepository.update(userId , updateUserDto);
    } 

    getUser(userId: number){
        return this.userRepository.findOne({ where: {id: userId}});
    }

    findByEmail(email: string){
        return this.userRepository.findOne({ where: {email }});
    }

    delete( userId: number){
        return this.userRepository.delete(userId);
    }
}