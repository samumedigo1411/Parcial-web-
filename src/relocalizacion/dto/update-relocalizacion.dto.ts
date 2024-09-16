import { PartialType } from '@nestjs/mapped-types';
import { CreateRelocalizacionDto } from './create-relocalizacion.dto';

export class UpdateRelocalizacionDto extends PartialType(CreateRelocalizacionDto) {}
