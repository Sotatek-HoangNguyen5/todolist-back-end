import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TodoStatus } from '../enums/todo-status.enum';

export class GetTodoFilterDto {
  @IsOptional()
  @IsIn([TodoStatus.OPEN, TodoStatus.IN_PROGRESS, TodoStatus.DONE])
  status: TodoStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
