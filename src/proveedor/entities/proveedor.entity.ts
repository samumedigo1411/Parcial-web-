import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Organo } from 'src/organos/entities/organo.entity';
@Entity()
export class Proveedor extends Usuario {
    @Column()
    isAvailable: boolean;
    @OneToMany(() => Organo, (organo) => organo.proveedor)
    organos: Organo[];
}
