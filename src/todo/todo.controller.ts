import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/entity/todo.entity';
import { Repository } from 'typeorm';
import { TodoService } from './todo.service';


@Controller('todo')
export class TodoController {
    
    constructor(private todoService: TodoService) {

    }
    
    @Get()
    getAllJobs() {
      return this.todoService.getAllItems();
    }

    @Get(':id')
    getOneJob(@Param('id') id: number) {
      return this.todoService.getOneItem(id);
    }

    @Post()
    createJob(@Body('title') title: string, @Body('description') description: string) {
        return this.todoService.createItem(title, description);
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
