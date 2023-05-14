import { FileModule } from "./frameworks/external_file_storage/file/file.module";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { UsuarioModule } from "./modules/usuario/usuario.module";
import { MySQLDatabaseModule } from "./frameworks/database/mysql/mysql.module";
import { ParametroModule } from "./modules/parametro/parametro.module";
import { ValorParametroModule } from "./modules/valor_parametro/valor_parametro.module";
import { PermisoModuloModule } from "./modules/permiso_modulo/permiso_modulo.module";
import { PermisoParametroModule } from "./modules/permiso_parametro/permiso_parametro.module";
import { PermisoRutaModule } from "./modules/permiso_ruta/permiso_ruta.module";
import { PermisoRolModule } from "./modules/permiso_rol/permiso_rol.module";
import { PermisoModule } from "./modules/permiso/permiso.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envConfiguration } from "./config/env.config";
import { JoiValidationSchema } from "./config/joi.validation";
import { LibroModule } from "./modules/libro/libro.module";
import { InventarioModule } from "./modules/inventario/inventario.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      validationSchema: JoiValidationSchema
    }),

    MySQLDatabaseModule,
    FileModule,
    ParametroModule,
    ValorParametroModule,
    PermisoModuloModule,
    PermisoParametroModule,
    PermisoRutaModule,
    PermisoRolModule,
    PermisoModule,
    UsuarioModule,
    LibroModule,
    InventarioModule,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
