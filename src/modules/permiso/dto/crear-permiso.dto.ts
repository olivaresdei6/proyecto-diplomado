import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";


export class CrearPermisoDto {
    @ApiProperty({
        description: 'UUID de la ruta',
        example: 'ab7b1c9c-1b1a-4f6a-8f0a-2b1a1d6b1a1d',
        required: true
    })
    @IsUUID('4', { message: 'El UUID de la ruta debe ser un UUID valido' })
    uuidRuta!: string;

    @ApiProperty({
        description: 'UUID del modulo',
        example: 'ab7b1c9c-1b1a-4f6a-8f0a-2b1a1d6b1a1d',
        required: true
    })
    @IsUUID('4', { message: 'El UUID del modulo debe ser un UUID valido' })
    uuidModulo!: string;

    @ApiProperty({
        description: 'UUID del rol',
        example: 'ab7b1c9c-1b1a-4f6a-8f0a-2b1a1d6b1a1d',
        required: true
    })
    @IsUUID('4', { message: 'El UUID del modulo debe ser un UUID valido' })
    uuidRol!: string;


    @ApiProperty({
        example: 'Permiso otorgado para el usuario',
        description: 'Descripción del permiso registrado',
    })
    @IsString({ message: 'La Descripción debe ser un string' })
    @MaxLength(500, { message: 'La Descripción debe tener máximo 500 caracteres' })
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        example: 'Este solo es un permiso de prueba',
        description: 'Observación del permiso registrado',
    })
    @IsString({ message: 'La Observacion debe ser un string' })
    @MaxLength(500, { message: 'La Observacion debe tener máximo 500 caracteres' })
    @IsOptional()
    observacion?: string;
}
