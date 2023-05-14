import { IPermisoParametroRutaRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLPermisoParametroRutaRepository<T> extends MysqlGenericRepository<T> implements IPermisoParametroRutaRepository <T> {

}
