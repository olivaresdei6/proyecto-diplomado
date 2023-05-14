import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CrearValorParametroDto {
    
    @ApiProperty({
        example: '#000000',
        description: 'Nombre del valor de parámetro. En este caso, el valor corresponde a un parametro llamado "Color"',
        nullable: false,
    })
    @IsString({message: "El nombre de cada valor parámetro debe ser un texto"})
    @MinLength(3, {message: "El nombre de cada valor parámetro debe tener al menos 3 caracteres"})
    @MaxLength(50, {message: "El nombre de cada valor parámetro debe tener máximo 50 caracteres"})
    nombre!: string;
    
    @ApiProperty({
        example: 'ab59-4b6b-9fbc-57e2',
        description: 'UUID del parámetro',
        nullable: false,
    })
    @IsString({message: "El uuid de cada parámetro debe ser un texto"})
    @IsUUID('4', {message: "El uuid de cada parámetro debe tener un formato válido"})
    @MaxLength(36, {message: "El uuid de cada parámetro debe tener máximo 36 caracteres"})
    uuid_parametro!: string;
    
    
    @ApiProperty({
        example: 'Color muy oscuro',
        description: 'Descripción del parámetro',
        nullable: true,
    })
    @IsOptional()
    @IsString({message: "La descripción de cada valor parámetro debe ser un texto"})
    @MinLength(3, {message: "La descripción de cada parámetro debe tener al menos 3 caracteres"})
    descripcion?: string;

    @ApiProperty({
        example: 'Solo debe usarse en productos de tecnologia',
        description: 'Observación del parámetro',
        nullable: true,
    })
    @IsOptional()
    @IsString({message: "La Observación de cada valor parámetro debe ser un texto"})
    @MinLength(3, {message: "La Observación de cada valor parámetro debe tener al menos 3 caracteres"})
    @MaxLength(100, {message: "La Observación de cada valor parámetro debe tener máximo 100 caracteres"})
    observacion?: string;


}
