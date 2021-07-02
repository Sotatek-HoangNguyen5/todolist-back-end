import { CreateTodoDto } from 'src/modules/todos/dto/create-todo.dto';
import { GetTodoFilterDto } from 'src/modules/todos/dto/get-todo-filter.dto';
import { TodoStatus } from 'src/modules/todos/enums/todo-status.enum';
import { EntityRepository, Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(TodoEntity)
export class TodoRepository extends Repository<TodoEntity> {
  async createTodo(
    createTodoDto: CreateTodoDto,
    user: UserEntity,
  ): Promise<TodoEntity> {
    const { title, description } = createTodoDto;

    const newTodo = new TodoEntity();
    newTodo.title = title;
    newTodo.description = description;
    newTodo.status = TodoStatus.OPEN;
    newTodo.user = user;
    await newTodo.save();

    delete newTodo.user;
    return newTodo;
  }

  async getTodos(
    filterDto: GetTodoFilterDto,
    user: UserEntity,
  ): Promise<TodoEntity[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('todo');
    query.andWhere('todo.userId = :userId', { userId: user.id });

    if (status) query.andWhere('todo.status = :status', { status });
    if (search)
      query.andWhere(
        '(todo.title LIKE :search OR task.descripton LIKE :search)',
        { search: `%${search}%` },
      );

    const todos = await query.getMany();
    return todos;
  }
}
