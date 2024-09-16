import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRelocalizacionDto } from './dto/create-relocalizacion.dto';
import { UpdateRelocalizacionDto } from './dto/update-relocalizacion.dto';
import { Relocalizacion } from './entities/relocalizacion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RelocalizacionService {
  constructor(
    @InjectRepository(Relocalizacion)
    private relocalizacionRepository: Repository<Relocalizacion>,
  ){}
  
  async create(createRelocalizacionDto: CreateRelocalizacionDto) {
    const newRelocalizacion = this.relocalizacionRepository.create(createRelocalizacionDto);
    return this.relocalizacionRepository.save(newRelocalizacion);
  }


  async findAll() {
    return await this.relocalizacionRepository.find();
  }

  async findOne(id: string) {
    const relocalizacion = await this.relocalizacionRepository.findOneBy({ id });
    if (!relocalizacion) throw new NotFoundException('Relocalizacion no encontrada');
    return relocalizacion;
  }

  async update(id: string, updateRelocalizacionDto: UpdateRelocalizacionDto) {
    const relocalizacion = await this.relocalizacionRepository.preload({
      id,
      ...updateRelocalizacionDto,
    });
    return await this.relocalizacionRepository.save(relocalizacion);
  }

  async remove(id: string) {
    const relocalizacion = await this.findOne(id);
    await this.relocalizacionRepository.remove(relocalizacion);
  }
}
