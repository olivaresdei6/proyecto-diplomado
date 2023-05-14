import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { PermisoRutaController } from "./permiso_ruta.controller";
import { PermisoRutaService } from "./permiso_ruta.service";

@Module({
    controllers: [PermisoRutaController],
    providers: [PermisoRutaService],
    exports: [PermisoRutaService],
    imports: [MySQLDatabaseModule]
})
export class PermisoRutaModule {}
