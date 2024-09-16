import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Relocalizacion {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    originCountry:string;
    @Column()
    destinationcountry:string;
    @Column({default:false})
    succesful:boolean;
}
