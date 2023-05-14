import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { InventarioController } from "./inventario.controller";
import { InventarioService } from "./inventario.service";

@Module({
    controllers: [InventarioController],
    providers: [InventarioService],
    exports: [InventarioService],
    imports: [MySQLDatabaseModule]
})
export class InventarioModule {}
