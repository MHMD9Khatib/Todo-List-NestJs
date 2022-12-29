import { IsInt, IsString } from "class-validator";

export class CreateTasksDto{
    @IsString()
    title: string;

    @IsString()
    description:string;

    @IsInt()
    user_id: number;
}