import { IPermisoRepository } from "../core/abstract";
import { Injectable } from "@nestjs/common";
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";
import {
    ParametroInterface,
    PermisoInterface,
    ResultadoParametrosDeUnaRuta,
    RutaParametros
} from "../core/interfaces/permisoInterface";


@Injectable()
export class MySQLPermisoRepository<T> extends MysqlGenericRepository<T> implements IPermisoRepository <T> {

    async obtenerPermisos(rolId:number): Promise<ResultadoParametrosDeUnaRuta[]>{
        const permisos: RutaParametros[] = await this.fetchPermisosRol(rolId);
        const rutasPermitidas: ResultadoParametrosDeUnaRuta[] = [];
        for (const permiso of permisos){
            let ruta = `/api/v1${permiso.permiso.rutaDelModulo}${permiso.permiso.direccionDeLaRuta}`;
            const parametros = permiso.parametros.length > 0 ? permiso.parametros : [];
            rutasPermitidas.push({ruta, metodoHttp: permiso.permiso.metodoHttp, parametros});
        }
        return rutasPermitidas;
    }

    private async fetchPermisosRol(rolId: number): Promise<RutaParametros[]> {
        const permisos: PermisoInterface[] = await this.obtenerPermisosDeUnRol(rolId);
        const rutaCompletaPromises: Promise<RutaParametros>[] = permisos.map(async (permiso) => {
            const parametrosDeLaRuta  = await this.obtenerParametrosDeUnaRuta(permiso.uuidDeLaRuta);
            return {
                permiso,
                parametros: parametrosDeLaRuta
            };
        });

        return await Promise.all(rutaCompletaPromises);
    }


    private async obtenerPermisosDeUnRol(rolId: number): Promise<PermisoInterface[]> {
        const query = `SELECT pr.uuid uuidDeLaRuta, r.nombre rolDeUsuario, pm.nombre nombreDelModulo, pm.ruta_modulo rutaDelModulo, 
                pr.nombre nombreDeLaRuta, pr.ruta direccionDeLaRuta, pr.nombre accionHaEjecutar, par.nombre metodoHttp FROM permiso p
                JOIN permiso_modulo pm on p.id_modulo = pm.id
                JOIN permiso_ruta pr on p.id_ruta = pr.id
                JOIN permiso_rol r on p.id_rol = r.id
                JOIN valor_parametro par on pr.id_metodo_http = par.id
                WHERE r.id = ${rolId} AND p.estado = 1
            ;
        `;
        return await this.ejecutarQuerySQL(query) as PermisoInterface[];
    }

    private async obtenerParametrosDeUnaRuta(rutaUUID: string): Promise<ParametroInterface[]> {
        const query = `
            SELECT pp.uuid, pp.nombre, pp.observacion, pp.es_requerido FROM permiso_ruta pr
                JOIN permiso_parametro_ruta ppr on pr.id = ppr.id_ruta
                JOIN permiso_parametro pp on ppr.id_parametro = pp.id
            WHERE pr.uuid = '${rutaUUID}' AND pr.estado = 1
        `;
        return await this.ejecutarQuerySQL(query) as ParametroInterface[];
    }
}
