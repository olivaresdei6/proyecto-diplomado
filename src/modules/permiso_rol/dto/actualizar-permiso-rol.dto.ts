import { CrearPermisoRolDto } from "./crear-permiso-rol.dto";
import { PartialType } from "@nestjs/swagger";


export class ActualizarPermisoRolDto extends PartialType(CrearPermisoRolDto) {}
