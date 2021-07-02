import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from 'src/models/repositories/todo.repository';
import { AuthModule } from '../auth/auth.module';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository]), AuthModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
