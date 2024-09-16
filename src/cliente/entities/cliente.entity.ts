import { Entity, Column, OneToMany } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Organo } from 'src/organos/entities/organo.entity';

@Entity()
export class Cliente extends Usuario {


    @Column()
    interestedInRecolocation: boolean;

    @Column()
    bloodType: string;
  
    @Column()
    country: string;

    @OneToMany(() => Organo, (organo) => organo.proveedor)
    organos: Organo[];
}
    