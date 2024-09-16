import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Usuario]), 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: async () => {
        return {
          secret: process.env.SECRET_PASSWORD,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  exports: [PassportModule, JwtModule, JwtStrategy, TypeOrmModule],
})
export class AuthModule {}
