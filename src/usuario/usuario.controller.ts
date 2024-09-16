import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service'; // Servicio de usuario
import { CreateUsuarioDto } from './dto/create-usuario.dto'; // DTO para crear usuario
import { UpdateUsuarioDto } from './dto/update-usuario.dto'; // DTO para actualizar usuario

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}
