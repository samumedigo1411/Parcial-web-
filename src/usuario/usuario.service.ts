import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}
  
  async create(createUsuarioDto: CreateUsuarioDto) {
    const hashPassword= await bcrypt.hash(createUsuarioDto.password, 10);
    const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(nuevoUsuario);  }

  async findAll() {
    return await this.usuarioRepository.find();
  }
  async validationUser(email: string, password: string) {
    if (!email || !password) throw new UnauthorizedException('Ingrese todos los campos ');
    const usuario = await this.usuarioRepository.findOne({ where: { email,password } });
    return usuario;
    
  } 
  async findOne(id: string)  {
    const usuario= await this.usuarioRepository.findOneBy({id:id});
    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');
    return usuario;
  }

    async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
      const usuario=await this.usuarioRepository.preload({id:id,...updateUsuarioDto})
      if (!usuario) throw new UnauthorizedException('Usuario no encontrado');
      try {
        return await this.usuarioRepository.save(usuario);
      } catch (error) {
        throw new UnauthorizedException('Usuario no encontrado');
    }
  }
  async remove(id: string) {
    const usuario= this.usuarioRepository.delete({id:id});
    if(!usuario) {    
      throw new UnauthorizedException('Usuario no encontrado');
    }
    await this.usuarioRepository.delete({id:id});
  }
}
