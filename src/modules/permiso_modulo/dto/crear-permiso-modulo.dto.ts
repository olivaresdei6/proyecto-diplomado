import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CrearPermisoModuloDto {
    @ApiProperty({
        description: 'Nombre del módulo',
        example: 'Usuarios',
    })
    @IsString({ message: 'El nombre del módulo debe ser un string' })
    @MinLength(3, { message: 'El nombre del módulo debe tener al menos 3 caracteres' })
    @MaxLength(100, { message: 'El nombre del módulo debe tener máximo 50 caracteres' })
    nombre!: string;


    @ApiProperty({
        example: '/usuarios',
        description: 'Ruta principal del modulo seleccionado'
    })
    @IsString({ message: 'La ruta del módulo debe ser un string' })
    @MinLength(3, { message: 'La ruta del módulo debe tener al menos 3 caracteres' })
    @MaxLength(100, { message: 'La ruta del módulo debe tener máximo 50 caracteres' })
    rutaModulo!: string;

    @ApiProperty({
        example: 'Módulo de usuarios',
        description: 'Descripción del módulo',
    })
    @IsString({ message: 'La descripción del módulo debe ser un string' })
    @MaxLength(500, { message: 'La descripción del módulo debe tener máximo 500 caracteres' })
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        example: 'Módulo de usuarios',
        description: 'Observación del módulo',
    })
    @IsString({ message: 'La observación del módulo debe ser un string' })
    @MaxLength(500, { message: 'La observación del módulo debe tener máximo 500 caracteres' })
    @IsOptional()
    observacion?: string;
}
