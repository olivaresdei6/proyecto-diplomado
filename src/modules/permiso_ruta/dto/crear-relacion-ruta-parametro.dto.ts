import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";


export class CrearRelacionRutaParametroDto {
    @ApiProperty({
        description: 'UUID de la ruta',
        example: 'ab7b1c9c-1b1a-4f6a-8f0a-2b1a1d6b1a1d',
        required: true
    })
    @IsUUID('4', { message: 'El UUID de la ruta debe ser un UUID valido' })
    uuidRuta!: string;

    @ApiProperty({
        description: 'UUID del parámetro',
        example: 'ab7b1c9c-1b1a-4f6a-8f0a-2b1a1d6b1a1d',
        required: true
    })
    @IsUUID('4', { message: 'El UUID del parámetro debe ser un UUID valido' })
    uuidParametro!: string;


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
