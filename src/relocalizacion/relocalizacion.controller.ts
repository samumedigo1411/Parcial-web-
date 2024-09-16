import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelocalizacionService } from './relocalizacion.service';
import { CreateRelocalizacionDto } from './dto/create-relocalizacion.dto';
import { UpdateRelocalizacionDto } from './dto/update-relocalizacion.dto';

@Controller('relocalizacion')
export class RelocalizacionController {
  constructor(private readonly relocalizacionService: RelocalizacionService) {}

  @Post()
  create(@Body() createRelocalizacionDto: CreateRelocalizacionDto) {
    return this.relocalizacionService.create(createRelocalizacionDto);
  }

  @Get()
  findAll() {
    return this.relocalizacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relocalizacionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelocalizacionDto: UpdateRelocalizacionDto) {
    return this.relocalizacionService.update(id, updateRelocalizacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relocalizacionService.remove(id);
  }
}
