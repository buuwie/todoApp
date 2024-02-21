import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>) {

    }
    
    async getAllItems() {
        return await this.repo.find();
    }

    async getOneItem(id: number) {
        return await this.repo.findOne({where: {id: id}});
    }

    async createItem(title: string, description: string) {
        const todo = new TodoEntity();
        todo.title = title;
        todo.description = description;

        this.repo.create(todo);
        return await this.repo.save(todo);
    }

    async updateItem(id: number, title: string, description: string, isCompleted: boolean) {
        const job = await this.repo.findOne({where: {id: id}});
        if (job) {
            job.title = title;
            job.description = description;
            job.isCompleted = isCompleted;
            return this.repo.save(job);
        }
        else throw new InternalServerErrorException('Something went wrong');
    }

    deleteItem (id: number) {
        return this.repo.delete(id).then(() => {});
    }
    
}
