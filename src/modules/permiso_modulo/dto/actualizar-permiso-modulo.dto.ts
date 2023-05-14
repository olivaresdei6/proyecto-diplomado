import { CrearPermisoModuloDto } from "./crear-permiso-modulo.dto";
import { PartialType } from "@nestjs/swagger";


export class ActualizarPermisoModuloDto extends PartialType(CrearPermisoModuloDto) {}
