import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganoDto } from './dto/create-organo.dto';
import { UpdateOrganoDto } from './dto/update-organo.dto';
import { Repository } from 'typeorm';
import { Organo } from './entities/organo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';

@Injectable()
export class OrganosService {
  constructor(
    @InjectRepository(Organo)
    private organoRepository: Repository<Organo>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Proveedor)
    private proveedorRepository: Repository<Proveedor>,

  ){}
  async create(createOrganoDto: CreateOrganoDto) {
    const { clienteId, proveedorId, ...organoData } = createOrganoDto;
    const cliente = await this.clienteRepository.findOneBy({ id: clienteId });
    if (!cliente) throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado`);
    const proveedor = await this.proveedorRepository.findOneBy({ id: proveedorId });
    if (!proveedor) throw new NotFoundException(`Proveedor con ID ${proveedorId} no encontrado`);
    const newOrgano = this.organoRepository.create({
      ...organoData,
      cliente,
      proveedor,
    });

    return await this.organoRepository.save(newOrgano);
  }

  async findAll() {
    return await this.organoRepository.find();
  }

  async findOne(idOrgano: string) {
    const organo = await this.organoRepository.findOneBy({idOrgano});
    if(!organo) throw new NotFoundException('Organo no encontrado');
    return organo;
  }

  async update(idOrgano: string, updateOrganoDto: UpdateOrganoDto) {
    const organo = await this.organoRepository.preload({
      idOrgano,
      ...updateOrganoDto,
    });
    if(!organo) throw new NotFoundException(`Organo con ID ${idOrgano} no encontrado`);{
  }
    return await this.organoRepository.save(organo);
  }

  async remove(idOrgano: string) {
    const organo = await this.findOne(idOrgano);
    await this.organoRepository.remove(organo);
  }
}
