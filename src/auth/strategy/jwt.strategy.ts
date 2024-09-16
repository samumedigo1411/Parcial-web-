import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt.payload";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(Usuario)
        private readonly userRepository:Repository<Usuario>
    ){
        super({
            secretOrKey:process.env.SECRET_PASSWORD,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }
    async validate(payload:JwtPayload){
        const {email}=payload;

        const usuario=await this.userRepository.findOneBy({email});
        if(!usuario){
            throw new BadRequestException("Unauthorized");
        }
        if(!usuario.isActive){
            throw new BadRequestException("Unauthorized");
        }
        
        return usuario;
    }
}