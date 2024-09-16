import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuario/entities/usuario.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const usuario = this.usuarioRepository.create(createAuthDto);
      usuario.password = await bcrypt.hash(usuario.password, 10);
      await this.usuarioRepository.save(usuario);
      const { name, email } = usuario;
      return { usuario: { name, email } };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.detail);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const { email, password } = loginAuthDto;
      const usuario = await this.usuarioRepository.findOneBy({ email });
      if (!usuario) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isValid = bcrypt.compareSync(password, usuario.password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const { name} = usuario;
      const jwt = this.jwtService.sign({ name, email });

      return { usuario: { name, email, jwt } };
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException(err.detail);
    }
  }
}
