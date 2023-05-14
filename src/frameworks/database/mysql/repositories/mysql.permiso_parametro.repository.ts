import { IPermisoParametroRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLPermisoParametroRepository<T> extends MysqlGenericRepository<T> implements IPermisoParametroRepository <T> {

}
