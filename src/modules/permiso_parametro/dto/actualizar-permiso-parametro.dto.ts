import { CrearPermisoParametroDto } from "./crear-permiso-parametro.dto";
import { PartialType } from "@nestjs/swagger";


export class ActualizarPermisoParametroDto extends PartialType(CrearPermisoParametroDto) {}
