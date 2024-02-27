import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from 'src/entity/todo.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
    AuthModule
  ],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
