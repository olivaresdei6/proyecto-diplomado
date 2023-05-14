import { CrearLibroDto } from "./crear-libro.dto";
import { PartialType } from "@nestjs/swagger";


export class ActualizarLibroDto extends PartialType(CrearLibroDto) {}
