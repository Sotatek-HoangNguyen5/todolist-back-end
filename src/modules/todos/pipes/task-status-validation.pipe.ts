import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TodoStatus } from '../enums/todo-status.enum';

export class TodoStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TodoStatus.OPEN,
    TodoStatus.IN_PROGRESS,
    TodoStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (this.isStatusValid(value)) return value;
    else throw new BadRequestException(`${value} is an invalid status`);
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.includes(status);
  }
}
