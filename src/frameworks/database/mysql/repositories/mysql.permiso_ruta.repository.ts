import { IPermisoRutaRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLPermisoRutaRepository<T> extends MysqlGenericRepository<T> implements IPermisoRutaRepository <T> {

}
