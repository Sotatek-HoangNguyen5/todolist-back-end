import { TodoStatus } from 'src/modules/todos/enums/todo-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TodoStatus;

  @ManyToOne((type) => UserEntity, (user) => user.todos, { eager: false })
  @JoinColumn()
  user: UserEntity;

  @Column()
  userId: number;
}
