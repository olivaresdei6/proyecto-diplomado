import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";


export class CrearPermisoParametroDto {
    @ApiProperty({
        description: 'Nombre del parámetro de ruta',
        example: 'id',
        required: true
    })
    @IsString({ message: 'El nombre del parámetro de ruta debe ser un string' })
    @MinLength(2, { message: 'El nombre del parámetro de ruta debe tener al menos 3 caracteres' })
    @MaxLength(100, { message: 'El nombre del parámetro de ruta debe tener máximo 50 caracteres' })
    nombre!: string;


    @ApiProperty({
        description: 'Determina si el parámetro es obligatorio',
        example: true,
        required: true,
    })
    @IsBoolean({ message: 'El campo esRequerido debe ser booleano' })
    @IsOptional()
    esRequerido?: boolean;

    @ApiProperty({
        description: 'Tipo de dato del parámetro',
        example: 2,
        required: true,
    })
    @IsNumber({}, { message: 'El tipo de dato del parámetro debe ser un número' })
    idTipoDeDato!: number;

    @ApiProperty({
        example: 'string',
        description: 'Descripción del Tipo de dato del parámetro',
    })
    @IsString({ message: 'La descripción del Tipo de dato del parámetro debe ser un string' })
    @MaxLength(500, { message: 'La descripción del Tipo de dato del parámetro debe tener máximo 500 caracteres' })
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        example: 'Módulo de usuarios',
        description: 'Observación del módulo',
    })
    @IsString({ message: 'La observación del Tipo de dato del parámetro debe ser un string' })
    @MaxLength(500, { message: 'La observación del Tipo de dato del parámetro debe tener máximo 500 caracteres' })
    @IsOptional()
    observacion?: string;
}
