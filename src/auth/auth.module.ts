import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ServicesModule } from '../services/services.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local-strategy/local-strategy.auth';
import { JwtStrategy } from './jwt-strategy/jwt-strategy.auth';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    PassportModule,
    ServicesModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
