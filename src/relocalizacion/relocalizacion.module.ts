import { Module } from '@nestjs/common';
import { RelocalizacionService } from './relocalizacion.service';
import { RelocalizacionController } from './relocalizacion.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relocalizacion } from './entities/relocalizacion.entity';
@Module({
  imports :[TypeOrmModule.forFeature([Relocalizacion])],
  controllers: [RelocalizacionController],
  providers: [RelocalizacionService],
})
export class RelocalizacionModule {}
