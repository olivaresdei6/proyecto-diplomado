import { Module } from '@nestjs/common';
import { ParametroService } from './parametro.service';
import { ParametroController } from './parametro.controller';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";

@Module({
  controllers: [ParametroController],
  providers: [ParametroService],
  exports: [ParametroService],
  imports: [MySQLDatabaseModule]
})
export class ParametroModule {}
