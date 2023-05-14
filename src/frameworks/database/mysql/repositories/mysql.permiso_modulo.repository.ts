import { IPermisoModuloRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLPermisoModuloRepository<T> extends MysqlGenericRepository<T> implements IPermisoModuloRepository <T> {

}
