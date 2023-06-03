import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";


export class CrearRelacionRutaParametroDto {
    @ApiProperty({
        description: 'ID de la ruta',
        example: 5,
        required: true
    })
    @IsNumber({}, { message: 'El ID de la ruta debe ser un número' })
    idRuta!: number;


    @ApiProperty({
        description: 'ID del parámetro',
        example: 3,
        required: true,
    })
    @IsNumber({}, { message: 'El ID del parámetro debe ser un número' })q
    idParametro!: number;


    @ApiProperty({
        example: 'string',
        description: 'Descripción del Tipo de dato del parámetro',
    })
    @IsString({ message: 'La Descripción de la relación entre la ruta y el parámetro debe ser un string' })
    @MaxLength(500, { message: 'La Descripción de la relación entre la ruta y el parámetro debe tener máximo 500 caracteres' })
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        example: 'Observacion de la relación entre la ruta y el parámetro',
        description: 'Esta relación es para saber que parámetros se pueden enviar en la ruta',
    })
    @IsString({ message: 'La Observacion de la relación entre la ruta y el parámetro debe ser un string' })
    @MaxLength(500, { message: 'La Observacion de la relación entre la ruta y el parámetro debe tener máximo 500 caracteres' })
    @IsOptional()
    observacion?: string;
}
