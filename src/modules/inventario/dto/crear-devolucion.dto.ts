import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";


export class CrearDevolucionDto {
    @ApiProperty({
      description: 'Observaciones de la devolución',
      nullable: true,
    })
    @IsString({ message: 'Las observaciones deben ser un string' })
    @MaxLength(500, { message: 'Las observaciones deben tener como máximo 500 caracteres' })
    @IsOptional()
    observacionesDevolucion?: string;

    @ApiProperty({
      description: 'ID del prestamo',
      example: 1,
      required: true
    })
    @IsNumber({}, { message: 'El ID del prestamo debe ser un número' })
    idPrestamo!: number;
}
