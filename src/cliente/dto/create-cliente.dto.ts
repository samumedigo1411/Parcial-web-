import { IsString, IsBoolean,IsNotEmpty } from 'class-validator';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class CreateClienteDto extends CreateUsuarioDto {


    @IsString()
    @IsNotEmpty()
    bloodType: string;

    @IsString()
    @IsNotEmpty()
    country: string;
    

    @IsBoolean()
    @IsNotEmpty()
    interestedInRecolocation: boolean;
}
