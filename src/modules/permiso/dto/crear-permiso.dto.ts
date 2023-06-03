import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";


export class CrearPermisoDto {
    @ApiProperty({
        description: 'ID de la ruta',
        example: 2,
        required: true
    })
    @IsNumber({}, { message: 'El ID de la ruta debe ser un número' })
    idRuta!: number;

    @ApiProperty({
        description: 'ID del modulo',
        example: 2,
        required: true
    })
    @IsNumber({}, { message: 'El ID del modulo debe ser un número' })
    idModulo!: number;

    @ApiProperty({
        description: 'ID del rol',
        example: 2,
        required: true
    })
    @IsNumber({}, { message: 'El ID del rol debe ser un número' })
    idRol!:number;


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
