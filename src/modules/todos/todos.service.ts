import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/models/entities/todo.entity';
import { UserEntity } from 'src/models/entities/user.entity';
import { TodoRepository } from 'src/models/repositories/todo.repository';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { TodoStatus } from './enums/todo-status.enum';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  async getTodos(
    filterDto: GetTodoFilterDto,
    user: UserEntity,
  ): Promise<TodoEntity[]> {
    return await this.todoRepository.getTodos(filterDto, user);
  }

  async getTodoById(id: number, user: UserEntity): Promise<TodoEntity> {
    const found = await this.todoRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) throw new NotFoundException(`Todo with ID "${id}" not found`);

    return found;
  }

  async createTodo(
    createTodoDto: CreateTodoDto,
    user: UserEntity,
  ): Promise<TodoEntity> {
    return await this.todoRepository.createTodo(createTodoDto, user);
  }

  async deleteTodo(id: number, user: UserEntity): Promise<TodoEntity> {
    const found = this.getTodoById(id, user);

    const rs = await this.todoRepository.delete({ id, userId: user.id });
    if (rs.affected === 0)
      throw new NotFoundException(`Task with ID "${id}" not found`);

    return found;
  }

  async updateTodoStatus(
    id: number,
    status: TodoStatus,
    user: UserEntity,
  ): Promise<TodoEntity> {
    const found = await this.getTodoById(id, user);
    found.status = status;

    await found.save();

    return found;
  }
}
