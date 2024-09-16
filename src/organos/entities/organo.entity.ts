import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Organo {
    @PrimaryGeneratedColumn('uuid')
    idOrgano: string;

    @Column()
    organType: string;

    @Column()
    bloodType: string;

    @Column()
    price: number;

    @Column()
    available: boolean;

    @ManyToOne(() => Cliente, (cliente) => cliente.organos)
    cliente: Cliente;
    @ManyToOne(() => Proveedor, (proveedor) => proveedor.organos)  
    proveedor: Proveedor;
}
