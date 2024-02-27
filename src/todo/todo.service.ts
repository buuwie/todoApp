import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTodoDto } from 'src/dto/createTodo.dto';
import { TodoEntity } from 'src/entity/todo.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>) {

    }
    
    async getAllItems(user: UserEntity) {
        const query = await this.repo.createQueryBuilder('todo');
        query.where(`todo.userId = :userId`, {userId: user.id});
        try {
            return await query.getMany();
        } catch (error) {
            throw new InternalServerErrorException('No todos found');
        }
    }

    async getOneItem(id: number) {
        return await this.repo.findOne({where: {id: id}});
    }

    async createItem(createTodoDto: createTodoDto, user: UserEntity) {
        const todo = new TodoEntity();
        const {title, description} = createTodoDto;
        todo.title = title;
        todo.description = description;
        todo.userId = user.id;

        this.repo.create(todo);
        return await this.repo.save(todo);
    }

    async updateItem(id: number, title: string, description: string, isCompleted: boolean) {
        console.log(typeof isCompleted)
        const job = await this.repo.findOne({where: {id: id}});
        if (job) {
            job.title = title;
            job.description = description;
            job.isCompleted = isCompleted;
            return this.repo.save(job);
        }
        else throw new InternalServerErrorException('Job not found');
    }

    async deleteItem (id: number) {
        const job = await this.repo.findOne({where: {id: id}});
        if (job) {
            return this.repo.delete(id).then(() => {});
        }
        else throw new InternalServerErrorException('Job not found.');
    }
    
}
