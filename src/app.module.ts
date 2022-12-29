import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { User } from './user/dto/entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { Tasks } from './tasks/dto-tasks/entity-tasks/tasks.entity';
  
@Module({
  controllers: [ AppController, TasksController ],
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,

      username: 'root',
      password: 'password',
      database: 'nestjs',
      entities: [User, Tasks],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    TasksModule,
  ],
})
export class AppModule {}

