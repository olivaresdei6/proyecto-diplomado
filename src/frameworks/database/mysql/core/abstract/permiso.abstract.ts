import { IGenericRepository } from "./generic.repository.abstract";
import { ResultadoParametrosDeUnaRuta } from "../interfaces/permisoInterface";

export abstract class IPermisoRepository<T> extends IGenericRepository<T>{
    public abstract obtenerPermisos(rolId:number): Promise<ResultadoParametrosDeUnaRuta[]>;
}
