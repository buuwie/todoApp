import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class createTodoDto {
    @IsNotEmpty()
    @MaxLength(15, {message: 'Max length is 15 characters.'})
    title: string;
    @IsNotEmpty()
    description: string;
    

}