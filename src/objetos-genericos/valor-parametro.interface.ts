import { ParametroEnum } from "./parametro.enum";
import { ValorParametroEntity } from "../frameworks/database/mysql/entities";

export interface ValorParametroInterface {
    parametro: ParametroEnum;
    valorParametro?: ValorParametroEntity;
}
