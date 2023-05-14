import { IUsuarioRepository } from "../core/abstract";
import {Injectable} from '@nestjs/common';
import { MysqlGenericRepository } from "./generic/mysql.generic.repository";


@Injectable()
export class MysqlLibroRepository<T> extends MysqlGenericRepository<T> implements IUsuarioRepository <T> {

}
