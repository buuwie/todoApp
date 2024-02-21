import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntity } from "./todo.entity";
import { todo } from "node:test";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
}