import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {JwtPayload} from "../modules/usuario/interfaces/jwt.payload.interface";
import {envConfiguration} from "../config/env.config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioEntity } from "../frameworks/database/mysql/entities";
import { IConexionDb } from "../frameworks/database/mysql/core/abstract";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    /**
     * El Passport Strategy es un decorador que nos permite revisar el token basado en la clave secreta
     * y si ha expirado o no. Mientras que la estrategia me va a permitir revisar el token y si es válido
     * o no.
     */
    
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: envConfiguration().jwtSecret,
        });
    }
    
    async validate(payload: JwtPayload) : Promise<UsuarioEntity> {
        const {  uuid } = payload;
        const usuario = await this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor({ where: { uuid} }, 'Usuario');
        if (!usuario || usuario.estado !== 1 || !usuario.estaActivo) {
           throw new UnauthorizedException('No tienes permisos para acceder a este recurso');
        }
        return usuario;
    }
}
