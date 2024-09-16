import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column() 
    phone: string;

    @Column()
    typeOrgan: string;
    
    @Column()
    bloodType: string;
  
    @Column()
    country: string;
    isActive: any;

    



}

