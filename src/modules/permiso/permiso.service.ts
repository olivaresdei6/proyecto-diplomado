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
        const { idRuta, idModulo, idRol } = crearPermisoDto;
        const [rutaId, moduloId, rolId] = await Promise.all([
            this.obtenerIdRuta(idRuta),
            this.obtenerIdModulo(idModulo),
            this.obtenerRol(idRol)
        ]);
        if (!idRuta || !idModulo || !idRol) {
            throw new BadRequestException('No se encontró la ruta, el módulo o el rol enviados');
        }
        const permiso = await this.servicioDeBaseDeDatos.permiso.crearRegistro({
            ...crearPermisoDto,
            ruta: idRuta,
            modulo: idModulo,
            rol: idRol,
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


    async obtenerUnRegistro(id: number): Promise<PermisoEntity> {
        return await this.servicioDeBaseDeDatos.permiso.obtenerUnRegistroPor({where: {id, estado: 1}}, 'Permiso');
    }

    async actualizarRegistro(id: number, actualizarPermisoDto: ActualizarPermisoDto)  {
        const { idRuta, idModulo, idRol, observacion, descripcion } = actualizarPermisoDto;
        if (idRuta) await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(id, { ruta: (await this.obtenerIdRuta(idRuta)).id });
        if (idModulo) await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(id, { modulo: (await this.obtenerIdModulo(idModulo)).id });
        if (idRol) await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(id, { rol: (await this.obtenerRol(idRol)).id });
        await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(id, { observacion, descripcion });
        return {
            status: 200,
            message: 'Permiso actualizado correctamente',
        }
    }

    async eliminarRegistro(id: number) {
        await this.servicioDeBaseDeDatos.permiso.actualizarRegistro(id, { estado: 0 })
        return {
            status: 200,
            message: 'Permiso eliminado correctamente',
        }
    }
    
    async obtenerIdRuta(id: number): Promise<PermisoRutaEntity> {
        return await this.servicioDeBaseDeDatos.permisoRuta.obtenerUnRegistroPor({where: {id, estado: 1}}, 'Ruta');
    }

    async obtenerIdModulo(id: number): Promise<PermisoModuloEntity> {
        return await this.servicioDeBaseDeDatos.permisoModulo.obtenerUnRegistroPor({where: {id, estado: 1}}, 'Modulo');
    }

    async obtenerRol(id: number): Promise<PermisoRolEntity> {
        return await this.servicioDeBaseDeDatos.permisoRol.obtenerUnRegistroPor({where: {id, estado: 1}}, 'Rol');
    }
}
