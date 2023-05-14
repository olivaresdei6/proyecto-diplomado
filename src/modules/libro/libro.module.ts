import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { LibroController } from "./libro.controller";
import { LibroService } from "./libro.service";

@Module({
    controllers: [LibroController],
    providers: [LibroService],
    exports: [LibroService],
    imports: [MySQLDatabaseModule]
})
export class LibroModule {}
