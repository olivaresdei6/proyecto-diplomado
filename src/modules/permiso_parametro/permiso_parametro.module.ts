import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { PermisoParametroController } from "./permiso_parametro.controller";
import { PermisoParametroService } from "./permiso_parametro.service";

@Module({
    controllers: [PermisoParametroController],
    providers: [PermisoParametroService],
    exports: [PermisoParametroService],
    imports: [MySQLDatabaseModule]
})
export class PermisoParametroModule {}
