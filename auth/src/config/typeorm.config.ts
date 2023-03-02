import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../auth/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'msdatabase',
  entities: [UserEntity],
};
