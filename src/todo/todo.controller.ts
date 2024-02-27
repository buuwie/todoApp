import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/entity/todo.entity';
import { Repository } from 'typeorm';
import { TodoService } from './todo.service';
import { createTodoDto } from 'src/dto/createTodo.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entity/user.entity';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
    
    constructor(private todoService: TodoService) {

    }
    
    @Get()
    getAllJobs(@User() user: UserEntity) {
      return this.todoService.getAllItems(user);
    }

    @Get(':id')
    getOneJob(@Param('id') id: number) {
      return this.todoService.getOneItem(id);
    }

    @Post()
    createJob(@Body(ValidationPipe) data: createTodoDto, @User() user: UserEntity) {
      const { title, description } = data
      return this.todoService.createItem(data, user);
    }

    @Patch(':id')
    updateJob(@Param('id') id: number, @Body('title') title: string , @Body('description') description: string, @Body('isCompleted') isCompleted: boolean) {
      return this.todoService.updateItem(id, title, description, isCompleted);
    }

    @Delete(':id')
    deleteJob(@Param('id') id: number) {
        return this.todoService.deleteItem(id);
    }
}
