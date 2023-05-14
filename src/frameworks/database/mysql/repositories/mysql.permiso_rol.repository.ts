import { IPermisoRolRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLPermisoRolRepository<T> extends MysqlGenericRepository<T> implements IPermisoRolRepository <T> {

}
