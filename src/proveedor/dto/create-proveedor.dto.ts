import { IsString, IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

export class CreateProveedorDto extends CreateUsuarioDto {
@IsBoolean()
@IsNotEmpty()
isAvailable: boolean;
}
