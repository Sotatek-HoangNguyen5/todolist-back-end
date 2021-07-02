import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoStatus } from './enums/todo-status.enum';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TodosService } from './todos.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/models/entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get('/')
  getTodos(
    @Query(ValidationPipe) filterDto: GetTodoFilterDto,
    @GetUser() user: UserEntity,
  ): Promise<TodoDto[]> {
    return this.todosService.getTodos(filterDto, user);
  }

  @Get('/:id')
  getTodoById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<TodoDto> {
    return this.todosService.getTodoById(id, user);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: UserEntity,
  ): Promise<TodoDto> {
    return this.todosService.createTodo(createTodoDto, user);
  }

  @Delete('/:id')
  deleteTodo(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<TodoDto> {
    return this.todosService.deleteTodo(id, user);
  }

  @Patch('/:id/status')
  updateTodoStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @GetUser() user: UserEntity,
  ): Promise<TodoDto> {
    return this.todosService.updateTodoStatus(id, status, user);
  }
}
