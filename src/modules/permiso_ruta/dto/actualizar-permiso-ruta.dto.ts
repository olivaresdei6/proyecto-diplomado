import { CrearPermisoRutaDto } from "./crear-permiso-ruta.dto";
import { PartialType } from "@nestjs/swagger";


export class ActualizarPermisoRutaDto extends PartialType(CrearPermisoRutaDto) {}
