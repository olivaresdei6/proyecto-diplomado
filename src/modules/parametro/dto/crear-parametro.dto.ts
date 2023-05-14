import {IsOptional, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
export class CrearParametroDto {
    
    @ApiProperty({
        example: 'Colores',
        description: 'Nombre del parámetro',
        nullable: false,
    })
    @IsString({message: "El nombre de cada parámetro debe ser un texto"})
    @MinLength(3, {message: "El nombre de cada parámetro debe tener al menos 3 caracteres"})
    nombre!: string;
    
    
    @ApiProperty({
        example: 'Colores de los productos',
        description: 'Descripción del parámetro',
        nullable: true,
    })
    @IsOptional()
    @IsString({message: "La descripción de cada parámetro debe ser un texto"})
    @MinLength(3, {message: "La descripción de cada parámetro debe tener al menos 3 caracteres"})
    descripcion?: string;

    @ApiProperty({
        example: 'Estos colores son los que se pueden elegir para los productos',
        description: 'Descripción del parámetro',
        nullable: true,
    })
    @IsOptional()
    @IsString({message: "La Observación de cada parámetro debe ser un texto"})
    @MinLength(3, {message: "La Observación de cada parámetro debe tener al menos 3 caracteres"})
    observacion?: string;

}
