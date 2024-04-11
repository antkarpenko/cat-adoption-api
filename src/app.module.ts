import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from '@common/variables/environment';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: Environment.DB_URL,
      synchronize: true,
      entities: [
        User,
      ],
    }),
    AuthModule,
    CoreModule,
    CatsModule
  ],
})
export class AppModule {}
