import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";


export class CrearPrestamoDto {
    @ApiProperty({
      description: 'Observaciones del prestamo',
      nullable: true,
    })
    @IsString({ message: 'Las observaciones deben ser un string' })
    @MaxLength(500, { message: 'Las observaciones deben tener como máximo 500 caracteres' })
    @IsOptional()
    observacionesPrestamo?: string;

    @ApiProperty({
      description: "Fecha de devolución esperada",
      example: "2021-01-01 00:00:00"
    })
    @IsString({ message: 'La fecha de devolución esperada debe ser un string' })
    @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, { message: 'La fecha de devolución esperada debe tener el formato YYYY-MM-DD' })
    fechaDevolucionEsperada!: string;

    @ApiProperty({
      description: 'UUID del libro que se presta',
      nullable: false,
    })
    @IsString({ message: 'El UUID debe ser un string' })
    @IsUUID('all', { message: 'El UUID debe ser un UUID válido' })
    uuidLibro!: string;
}
