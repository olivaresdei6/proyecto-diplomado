import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";


export class CrearPermisoRutaDto {
    @ApiProperty({
        description: 'Nombre de la ruta',
        example: 'crear',
        required: true
    })
    @IsString({ message: 'El Nombre de la ruta debe ser un string' })
    @MinLength(2, { message: 'El Nombre de la ruta debe tener al menos 3 caracteres' })
    @MaxLength(100, { message: 'El Nombre de la ruta debe tener máximo 50 caracteres' })
    nombre!: string;


    @ApiProperty({
        description: 'Ubicación de la ruta',
        example: '/crear_usuario',
        required: true,
    })
    @IsString({ message: 'La ubicación de la ruta debe ser un string' })
    @MaxLength(100, { message: 'La ubicación de la ruta debe tener máximo 50 caracteres' })
    @IsOptional()
    ruta?: string;

    @ApiProperty({
        description: 'Accion que se puede ejecutar en la ruta',
        example: 'ab7b1c9c-1b1a-4f6a-8f0a-2b1a1d6b1a1d',
        required: true,
    })
    @IsUUID('4', { message: 'El UUID del Método http debe ser un UUID valido' })
    uuidMetodoHttp!: string;


    @ApiProperty({
        example: 'string',
        description: 'Descripción del Tipo de dato del parámetro',
    })
    @IsString({ message: 'La descripción de la ruta debe ser un string' })
    @MaxLength(500, { message: 'La descripción de Descripción de la ruta debe tener máximo 500 caracteres' })
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        example: 'Módulo de usuarios',
        description: 'Observación del módulo',
    })
    @IsString({ message: 'La observación de la ruta debe ser un string' })
    @MaxLength(500, { message: 'La observación de de la ruta debe tener máximo 500 caracteres' })
    @IsOptional()
    observacion?: string;
}
