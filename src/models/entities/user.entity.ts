import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { bcrypt } from 'bcrypt';
import { TodoEntity } from './todo.entity';

@Entity('user')
@Unique(['userName', 'email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  confirmPassword: string;

  @Column({ select: false })
  salt: string;

  @OneToMany((type) => TodoEntity, (todo) => todo.user, { eager: true })
  @JoinColumn()
  todos: TodoEntity[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}