import { IImagenRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MySQLImagenRepository<T> extends MysqlGenericRepository<T> implements IImagenRepository <T> {

}
