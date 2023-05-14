import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class CrearLibroDto{
    @ApiProperty({
      example: '100 años de soledad',
      description: 'Título del libro',
      nullable: false,
    })
    @IsString({ message: 'El título debe ser un string' })
    @MinLength(4, { message: 'El título debe tener al menos 4 caracteres' })
    @MaxLength(500, { message: 'El título debe tener como máximo 500 caracteres' })
    titulo!: string;

    @ApiProperty({
      example: 'Gabriel García Márquez',
      description: 'Autor del libro',
      nullable: false,
    })
    @IsString({ message: 'El autor debe ser un string' })
    @MinLength(4, { message: 'El autor debe tener al menos 4 caracteres' })
    @MaxLength(200, { message: 'El autor debe tener como máximo 200 caracteres' })
    autor!: string;

    @ApiProperty({
      example: 'https://www.pixabay.com/imagen.jpg',
      description: 'URL de la imagen del libro',
      nullable: false,
    })
    @IsString({ message: 'La URL debe ser un string' })
    @MinLength(4, { message: 'La URL debe tener al menos 4 caracteres' })
    url!: string;

    @ApiProperty({
      example: 'Este libro que trata de un pueblo llamado Macond, en el que...',
      description: 'Descripción del libro',
      nullable: false,
    })
    @IsString({ message: 'La descripción debe ser un string' })
    @MinLength(4, { message: 'La descripción debe tener al menos 4 caracteres' })
    @MaxLength(800, { message: 'La descripción debe tener como máximo 800 caracteres' })
    descripcion!: string;

    @ApiProperty({
      example: 10,
      description: 'Unidades disponibles del libro',
      nullable: false,
    })
    @IsNumber({},{ message: 'Las unidades disponibles deben ser un string' })
    unidades!: number;

    @ApiProperty({
      description: 'Observaciones del libro',
      nullable: true,
    })
    @IsString({ message: 'Las observaciones deben ser un string' })
    @MaxLength(500, { message: 'Las observaciones deben tener como máximo 500 caracteres' })
    @IsOptional()
    observaciones?: string;

}
