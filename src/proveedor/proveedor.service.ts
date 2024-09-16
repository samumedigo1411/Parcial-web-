import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { CreateProveedorDto } from './dto/create-proveedor.dto';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(createProveedorDto: CreateProveedorDto) {
    const newProveedor = this.proveedorRepository.create(createProveedorDto);
    return this.proveedorRepository.save(newProveedor);
  }

  async findAll() {
    return await this.proveedorRepository.find();
  }

  async findOne(id: string) {
    const proveedor = await this.proveedorRepository.findOneBy({ id });
    if (!proveedor) throw new NotFoundException('Proveedor no encontrado');
    return proveedor;
  }

  async update(id: string, updateProveedorDto: UpdateProveedorDto) {
    const proveedor = await this.proveedorRepository.preload({
      id, 
      ...updateProveedorDto,
    });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no se encuentra`);
    }

    return await this.proveedorRepository.save(proveedor);
  }

  async remove(id: string) {
    const proveedor = await this.findOne(id);
    await this.proveedorRepository.remove(proveedor);
  }
}
