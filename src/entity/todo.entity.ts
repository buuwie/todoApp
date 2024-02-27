import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('todos')
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column({default: 0})
    isCompleted: boolean;
    @ManyToOne(() => UserEntity, (user) => user.todos)
    user: UserEntity;
    @Column()
    userId: number;
}
