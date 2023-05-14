import { PartialType } from "@nestjs/swagger";
import { CrearPermisoDto } from "./crear-permiso.dto";


export class ActualizarPermisoDto extends PartialType(CrearPermisoDto) {}
