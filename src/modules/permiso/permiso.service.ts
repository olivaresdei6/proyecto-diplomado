import { BadRequestException, Injectable } from "@nestjs/common";
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import {
    PermisoEntity,
    PermisoModuloEntity,
    PermisoRolEntity,
    PermisoRutaEntity
} from "../../frameworks/database/mysql/entities";
import { CrearPermisoDto } from "./dto/crear-permiso.dto";
import { ActualizarPermisoDto } from "./dto/actualizar-permiso.dto";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";

@Injectable()
export class PermisoService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}
    
    
    async crearRegistro(crearPermisoDto: CrearPermisoDto)  {
        const { uuidRuta, uuidModulo, uuidRol } = crearPermisoDto;
        const [idRuta, idModulo, idRol] = await Promise.all([
            this.obtenerIdRuta(uuidRuta),
            this.obtenerIdModulo(uuidModulo),
            this.obtenerRol(uuidRol)
        ]);
        if (!idRuta || !idModulo || !idRol) {
            throw new BadRequestException('No se encontró la ruta, el módulo o el rol enviados');
        }
        const permiso = await this.servicioDeBaseDeDatos.permiso.crearRegistro({
            ...crearPermisoDto,
            ruta: idRuta.id,
            modulo: idModulo.id,
            rol: idRol.id,
        });
        return {
            status: 201,
            message: 'Permiso creado correctamente',
            data: permiso
        }
    }
    
    async obtenerTodosLosRegistros(): Promise<PermisoEntity[]> {
        return await this.servicioDeBaseDeDatos.permiso.obtenerRegistros();
    }


    async obtenerUnRegistro(uuid: string): Promise<PermisoEntity> {
        return await this.servicioDeBaseDeDatos.permiso.obtenerUnRegistroPor({where: {uuid, estado: 1}}, 'Permiso');
    }

    async actualizarRegistro(uuid: string, actualizarPermisoDto: ActualizarPermisoDto)  {
        const { uuidRuta, uuidModulo, uuidRol, observacion, descripcion } = actualizarPermisoDto;
        if (uuidRuta) await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(uuid, { ruta: (await this.obtenerIdRuta(uuidRuta)).id });
        if (uuidModulo) await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(uuid, { modulo: (await this.obtenerIdModulo(uuidModulo)).id });
        if (uuidRol) await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(uuid, { rol: (await this.obtenerRol(uuidRol)).id });
        await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(uuid, { observacion, descripcion });
        return {
            status: 200,
            message: 'Permiso actualizado correctamente',
        }
    }

    async eliminarRegistro(uuid: string) {
        await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(uuid, { estado: 0 })
        return {
            status: 200,
            message: 'Permiso eliminado correctamente',
        }
    }
    
    async obtenerIdRuta(uuid: string): Promise<PermisoRutaEntity> {
        return await this.servicioDeBaseDeDatos.permisoRuta.obtenerUnRegistroPor({where: {uuid, estado: 1}}, 'Ruta');
    }

    async obtenerIdModulo(uuid: string): Promise<PermisoModuloEntity> {
        return await this.servicioDeBaseDeDatos.permisoModulo.obtenerUnRegistroPor({where: {uuid, estado: 1}}, 'Modulo');
    }

    async obtenerRol(uuid: string): Promise<PermisoRolEntity> {
        return await this.servicioDeBaseDeDatos.permisoRol.obtenerUnRegistroPor({where: {uuid, estado: 1}}, 'Rol');
    }
}
