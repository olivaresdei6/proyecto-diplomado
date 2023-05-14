import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import {
    DeepPartial,
    FindOneOptions,
    FindOptionsSelect,
} from "typeorm";
import { RespuestaPaginadaInterface } from "../interfaces/respuesta_paginada.interface";
import { BuscarRegistrosInterface } from "../interfaces/buscar_registros.interface";

export abstract class IGenericRepository<T> {

    public abstract obtenerRegistros(opcionesDeConsulta?: FindOptionsSelect<T>, condicion?:FindOptionsWhere<T>, relaciones?:string[]): Promise<T[]>;

    public abstract obtenerUnRegistroPor(opcionesDeConsultas: FindOneOptions<T>, nombreDeLaEntidad: string, lanzarExepcion?: boolean): Promise<T>

    public abstract obtenerRegistrosPor(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], options?: FindOneOptions<T>): Promise<T[]>;

    public abstract obtenerRegistrosPaginados(opciones: BuscarRegistrosInterface): Promise<RespuestaPaginadaInterface<T>>;

    public abstract crearRegistro(entidad: DeepPartial<T>): Promise<T>;

    public abstract actualizarRegistro(id: string | number, entity: DeepPartial<T>): Promise<T>;

    public abstract ejecutarQuerySQL(query: string);

    public abstract validarPaginacion(page: number, limit: number, total:number): boolean;
}
