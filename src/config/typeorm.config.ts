import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'admin',
  password: '1',
  database: 'todolist',
  autoLoadEntities: true,
  synchronize: true,
};
