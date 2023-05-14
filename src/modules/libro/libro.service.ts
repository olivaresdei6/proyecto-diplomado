import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { BadRequestException, Injectable } from "@nestjs/common";
import { LibroEntity } from "../../frameworks/database/mysql/entities";
import { CrearLibroDto } from "./dto/crear-libro.dto";
import { camposBusquedaLibro } from "./objects/campos_busqueda_libro";
import { ActualizarLibroDto } from "./dto/actualizar-libro.dto";

@Injectable()
export class LibroService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}

    async crearRegistro(crearLibroDto: CrearLibroDto)  {
        const libro =  await this.servicioDeBaseDeDatos.libro.crearRegistro({...crearLibroDto, unidadesDisponibles: crearLibroDto.unidades});
        if (libro) {
            return {
                status: 201,
                message: 'Libro creado correctamente',
                data: libro
            }
        }
    }

    async obtenerTodosLosRegistros(): Promise<LibroEntity[]> {
        return await this.servicioDeBaseDeDatos.libro.obtenerRegistros();
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        if (campo && !camposBusquedaLibro.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Se esperaba uno de estos: ' + camposBusquedaLibro.join(', '));
        }
        else if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.libro.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.libro.obtenerRegistrosPaginados({limite, pagina});
        }
    }

    async obtenerUnRegistro(uuid: string): Promise<LibroEntity> {
        const respuesta =  await this.servicioDeBaseDeDatos.libro.obtenerUnRegistroPor({where: {uuid, estado: 1}}, 'Libro');
        if (respuesta) {
            return respuesta;
        }else {
            throw new BadRequestException('No se encontró el libro');
        }
    }

    async actualizarRegistro(uuid: string, actualizarLibroDto: ActualizarLibroDto)  {
        const libro = await this.servicioDeBaseDeDatos.libro.actualizarRegistro(uuid, actualizarLibroDto);
        if (libro) {
            return {
                status: 201,
                message: 'Libro actualizado correctamente',
            }
        }
    }

    async eliminarRegistro(uuid: string) {
        const libro = await this.servicioDeBaseDeDatos.libro.actualizarRegistro(uuid, {estado: 0});
        if (libro) {
            return {
                status: 201,
                message: 'Libro eliminado correctamente',
            }
        }
    }

}
