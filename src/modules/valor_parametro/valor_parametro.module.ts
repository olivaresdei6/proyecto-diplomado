import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { ValorParametroService } from "./valor_parametro.service";
import { ValorParametroController } from "./valor_parametro.controller";

@Module({
  controllers: [ValorParametroController],
  providers: [ValorParametroService],
  exports: [ValorParametroService],
  imports: [MySQLDatabaseModule]
})
export class ValorParametroModule {}
