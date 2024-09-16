import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganosService } from './organos.service';
import { OrganosController } from './organos.controller';
import { Organo } from './entities/organo.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity'; 
import { Proveedor } from 'src/proveedor/entities/proveedor.entity'; 
import { ClienteModule } from 'src/cliente/cliente.module'; 
import { ProveedorModule } from 'src/proveedor/proveedor.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Organo, Cliente, Proveedor]), 
    ClienteModule, 
    ProveedorModule, 
  ],
  controllers: [OrganosController],
  providers: [OrganosService],
})
export class OrganosModule {}
