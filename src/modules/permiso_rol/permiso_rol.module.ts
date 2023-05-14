import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { PermisoRolController } from "./permiso_rol.controller";
import { PermisoRolService } from "./permiso_rol.service";

@Module({
    controllers: [PermisoRolController],
    providers: [PermisoRolService],
    exports: [PermisoRolService],
    imports: [MySQLDatabaseModule]
})
export class PermisoRolModule {}
