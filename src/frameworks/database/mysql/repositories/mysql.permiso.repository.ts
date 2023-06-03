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
        return permisos.map(permiso => {
            let ruta = `/api/v1${permiso.permiso.rutaDelModulo}${permiso.permiso.direccionDeLaRuta}`;
            return { ruta };
        });
    }

    private async fetchPermisosRol(rolId: number): Promise<RutaParametros[]> {
        const permisos: PermisoInterface[] = await this.obtenerPermisosDeUnRol(rolId);

        return permisos.map((permiso, index) => ({
            permiso
        }));
    }


    private async obtenerPermisosDeUnRol(rolId: number): Promise<PermisoInterface[]> {
        const query = `
            SELECT pr.id idDeLaRuta, r.nombre rolDeUsuario, pm.nombre nombreDelModulo, pm.ruta_modulo rutaDelModulo, 
            pr.nombre nombreDeLaRuta, pr.ruta direccionDeLaRuta, pr.nombre accionHaEjecutar, par.nombre metodoHttp FROM permiso p
            INNER JOIN permiso_modulo pm ON p.id_modulo = pm.id
            INNER JOIN permiso_ruta pr ON p.id_ruta = pr.id
            INNER JOIN permiso_rol r ON p.id_rol = r.id
            INNER JOIN valor_parametro par ON pr.id_metodo_http = par.id
            WHERE r.id = ${rolId} AND p.estado = 1;
    `;
        const consulta =  await this.ejecutarQuerySQL(query);
        return consulta as PermisoInterface[];
    }

}
