import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CrearPermisoRolDto } from "./dto/crear-permiso-rol.dto";
import { ActualizarPermisoRolDto } from "./dto/actualizar-permiso-rol.dto";
import { PermisoRolEntity } from "../../frameworks/database/mysql/entities";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";

@Injectable()
export class PermisoRolService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}

    async crearRegistro(crearPermisoRolDto: CrearPermisoRolDto)  {
        const permisoRol =  await this.servicioDeBaseDeDatos.permisoRol.crearRegistro(crearPermisoRolDto);
        if (permisoRol) {
            return {
                status: 201,
                message: 'Rol creado correctamente',
                data: permisoRol
            }
        }
    }

    async obtenerTodosLosRegistros(): Promise<PermisoRolEntity[]> {
        return await this.servicioDeBaseDeDatos.permisoRol.obtenerRegistros();
    }

    async obtenerRegistrosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        if (campo && !camposDeBusquedaGenericos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Se esperaba uno de estos: ' + camposDeBusquedaGenericos.join(', '));
        }
        else if (busqueda && campo) {
            return await this.servicioDeBaseDeDatos.permisoRol.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            return await this.servicioDeBaseDeDatos.permisoRol.obtenerRegistrosPaginados({limite, pagina});
        }
    }

    async obtenerUnRegistro(uuid: string): Promise<PermisoRolEntity> {
        return await this.servicioDeBaseDeDatos.permisoRol.obtenerUnRegistroPor({where: {uuid, estado: 1}}, 'Rol');
    }

    async actualizarRegistro(uuid: string, actualizarPermisoRolDto: ActualizarPermisoRolDto)  {
        const rol = await this.servicioDeBaseDeDatos.permisoRol.actualizarRegistro(uuid, actualizarPermisoRolDto);
        if (rol) {
            return {
                status: 201,
                message: 'Rol actualizado correctamente',
            }
        }
    }

    async eliminarRegistro(uuid: string) {
        const respuesta = await this.servicioDeBaseDeDatos.permisoRol.actualizarRegistro(uuid, {estado: 1});
        if (respuesta) {
            return {
                status: 201,
                message: 'Rol eliminado correctamente',
            }
        }
    }

}
