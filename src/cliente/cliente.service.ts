import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const newCliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(newCliente);
  }

  async findAll() {
    return await this.clienteRepository.find();
  }

  async findOne(id: string) {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.preload({
      id, 
      ...updateClienteDto,
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no se encuentra`);
    }

    return await this.clienteRepository.save(cliente);
  }

  async remove(id: string) {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }
}
