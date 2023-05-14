import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { PermisoModuloController } from "./permiso_modulo.controller";
import { PermisoModuloService } from "./permiso_modulo.service";

@Module({
    controllers: [PermisoModuloController],
    providers: [PermisoModuloService],
    exports: [PermisoModuloService],
    imports: [MySQLDatabaseModule]
})
export class PermisoModuloModule {}
