import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ManyToOne } from 'typeorm';
export class CreateOrganoDto {
    @IsString()
    @IsNotEmpty()
    organType   : string;

    @IsString()
    @IsNotEmpty()
    bloodType: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsBoolean()
    @IsNotEmpty()
    available: boolean;

    @IsString()
    @IsNotEmpty()
    clienteId: string;

    @IsString()
    @IsNotEmpty()
    proveedorId: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.organos) 
  cliente: Cliente;

}
