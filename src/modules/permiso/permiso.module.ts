import { Module } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { PermisoController } from './permiso.controller';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";

@Module({
  controllers: [PermisoController],
  providers: [PermisoService],
  exports: [PermisoService],
  imports: [MySQLDatabaseModule]
})
export class PermisoModule {}
