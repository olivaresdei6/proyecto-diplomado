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
            return await this.servicioDeBaseDeDatos.libro.obtenerRegistrosPaginados({limite, pagina, busqueda, campo, condicion: `estado = ${1}`});
        }else {
            return await this.servicioDeBaseDeDatos.libro.obtenerRegistrosPaginados({limite, pagina, condicion: `estado = ${1}`});
        }
    }

    async obtenerUnRegistro(id: number): Promise<LibroEntity> {
        const respuesta =  await this.servicioDeBaseDeDatos.libro.obtenerUnRegistroPor({where: {id, estado: 1}}, 'Libro');
        if (respuesta) {
            return respuesta;
        }else {
            throw new BadRequestException('No se encontró el libro');
        }
    }

    async actualizarRegistro(id: number, actualizarLibroDto: ActualizarLibroDto)  {
        let libro;
        if (actualizarLibroDto.unidades) {
            libro = await this.servicioDeBaseDeDatos.libro.actualizarRegistro(id, {...actualizarLibroDto, unidadesDisponibles: actualizarLibroDto.unidades});
        }else{
            libro = await this.servicioDeBaseDeDatos.libro.actualizarRegistro(id, {...actualizarLibroDto});
        }
        if (libro) {
            return {
                status: 201,
                message: 'Libro actualizado correctamente',
            }
        }
    }

    async eliminarRegistro(id: number) {
        const libro = await this.servicioDeBaseDeDatos.libro.actualizarRegistro(id, {estado: 0});
        if (libro) {
            return {
                status: 201,
                message: 'Libro eliminado correctamente',
            }
        }
    }

}
