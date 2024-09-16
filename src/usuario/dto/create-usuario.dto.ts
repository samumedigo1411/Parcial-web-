import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUsuarioDto {
    @IsString()
    @Length(3, 50)
    name: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    @Length(6, 50)
    password: string;
    
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    typeOrgan: string;

    @IsString()
    @IsNotEmpty()
    bloodType: string;

    @IsString()
    @IsNotEmpty()
    country: string;
    
}