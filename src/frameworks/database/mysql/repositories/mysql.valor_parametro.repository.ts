import { IValorParametroRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLValorParametroRepository<T> extends MysqlGenericRepository<T> implements IValorParametroRepository <T> {

}
