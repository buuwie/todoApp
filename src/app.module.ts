import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { TodoEntity } from './entity/todo.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'todo',
    autoLoadEntities: true,
    synchronize: true,
    entities: [TodoEntity, UserEntity],
}), TodoModule, UserModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
