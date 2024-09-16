import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganosService } from './organos.service';
import { CreateOrganoDto } from './dto/create-organo.dto';
import { UpdateOrganoDto } from './dto/update-organo.dto';

@Controller('organos')
export class OrganosController {
  constructor(private readonly organosService: OrganosService) {}

  @Post()
  create(@Body() createOrganoDto: CreateOrganoDto) {
    return this.organosService.create(createOrganoDto);
  }

  @Get()
  findAll() {
    return this.organosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') idOrgano: string) {
    return this.organosService.findOne(idOrgano);
  }

  @Patch(':id')
  update(@Param('id') idOrgano: string, @Body() updateOrganoDto: UpdateOrganoDto) {
    return this.organosService.update(idOrgano, updateOrganoDto);
  }

  @Delete(':id')
  remove(@Param('id') idOrgano: string) {
    return this.organosService.remove(idOrgano);
  }
}
