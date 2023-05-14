import { IRegistroDeAccesoRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLRegistroDeAccesoRepository<T> extends MysqlGenericRepository<T> implements IRegistroDeAccesoRepository <T> {

}
