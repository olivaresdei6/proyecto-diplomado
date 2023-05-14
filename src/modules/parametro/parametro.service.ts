import { BadRequestException, Injectable } from "@nestjs/common";
import {CrearParametroDto} from './dto/crear-parametro.dto';
import {ActualizarParametroDto} from './dto/actualizar-parametro.dto';
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { ParametroEntity } from "../../frameworks/database/mysql/entities";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";

@Injectable()
export class ParametroService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}
    
    
    async crearRegistro(crearParametroDto: CrearParametroDto)  {
        const parametro =  await this.servicioDeBaseDeDatos.parametro.crearRegistro(crearParametroDto);
        if (parametro) {
            return {
                status: 201,
                message: 'Parámetro creado correctamente',
            }
        }
    }
    
    async obtenerTodosLosRegistros(): Promise<ParametroEntity[]> {
        return await this.servicioDeBaseDeDatos.parametro.obtenerRegistros();
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        if (campo && !camposDeBusquedaGenericos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Se esperaba uno de estos: ' + camposDeBusquedaGenericos.join(', '));
        }
        else if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.parametro.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.parametro.obtenerRegistrosPaginados({limite, pagina});
        }
    }
    
    async obtenerUnRegistro(uuid: string): Promise<ParametroEntity> {
        return await this.servicioDeBaseDeDatos.parametro.obtenerUnRegistroPor({where: {uuid}}, 'Parámetro');
    }
    
    async actualizarRegistro(uuid: string, actualizarParametroDto: ActualizarParametroDto)  {
        const parametro = await this.servicioDeBaseDeDatos.parametro.actualizarRegistro(uuid, actualizarParametroDto);
        if (parametro) {
            return {
                status: 201,
                message: 'Parámetro actualizado correctamente',
            }
        }
    }
}
