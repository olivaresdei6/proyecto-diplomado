import { PartialType } from "@nestjs/swagger";
import { CrearRelacionRutaParametroDto } from "./crear-relacion-ruta-parametro.dto";


export class ActualizarRelacionRutaParametroDto extends PartialType(CrearRelacionRutaParametroDto) {}
