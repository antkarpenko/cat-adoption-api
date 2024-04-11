import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Environment } from '@common/variables/environment';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [
    AuthController,
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: Environment.JWT_SECRET,
      signOptions: { expiresIn: '7h' },
    }),
    UserModule,
  ],
  providers: [
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}


