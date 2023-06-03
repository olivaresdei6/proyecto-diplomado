import { BadRequestException, Injectable } from "@nestjs/common";
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { CrearValorParametroDto } from "./dto/crear-valor_parametro.dto";
import { ValorParametroEntity } from "../../frameworks/database/mysql/entities";
import { ActualizarValorParametroDto } from "./dto/actualizar-valor_parametro.dto";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";

@Injectable()
export class ValorParametroService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}
    
    
    async crearRegistro(crearValorParametroDto: CrearValorParametroDto)  {
        const valorParametro = await this.servicioDeBaseDeDatos.valorParametro.crearRegistro({...crearValorParametroDto, parametro: crearValorParametroDto.idParametro});
        if (valorParametro) {
            return {
                status: 201,
                message: 'Valor parámetro creado correctamente',
                data: valorParametro
            }
        }
    }
    
    async obtenerTodosLosRegistros(idParametro:number): Promise<ValorParametroEntity[]> {
        const valoresParametros =  await this.servicioDeBaseDeDatos.valorParametro.obtenerRegistros()
        if (valoresParametros) {
            // @ts-ignore
            return valoresParametros.filter(valor => valor.parametro.id === idParametro);
        } else {
            throw new BadRequestException('No se encontraron valores para el parámetro');
        }
    }
    
    async obtenerUnRegistro(id: number) {
        return await this.servicioDeBaseDeDatos.valorParametro.obtenerUnRegistroPor({where: {id}}, 'Valor parámetro');
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        if (campo && !camposDeBusquedaGenericos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Se esperaba uno de estos: ' + camposDeBusquedaGenericos.join(', '));
        }
        else if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.valorParametro.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.valorParametro.obtenerRegistrosPaginados({limite, pagina});
        }
    }

    async actualizarRegistro(id: number, actualizarValorParametroDto: ActualizarValorParametroDto){
        const valorParametro = await this.servicioDeBaseDeDatos.valorParametro.actualizarRegistro(id, actualizarValorParametroDto);
        if (valorParametro) {
            return {
                status: 201,
                message: 'Parámetro actualizado correctamente',
            }
        }
    }
}
