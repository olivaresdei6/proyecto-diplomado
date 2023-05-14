import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CrearPermisoRolDto {
    @ApiProperty({
        description: 'Nombre del módulo',
        example: 'usuario normal',
    })
    @IsString({ message: 'El nombre del rol debe ser un string' })
    @MinLength(3, { message: 'El nombre del rol debe tener al menos 3 caracteres' })
    @MaxLength(100, { message: 'El nombre del rol debe tener máximo 50 caracteres' })
    nombre!: string;

    @ApiProperty({
        example: 'Rol de usuario normal',
        description: 'Descripción del rol',
    })
    @IsString({ message: 'La descripción del rol debe ser un string' })
    @MaxLength(500, { message: 'La descripción del rol debe tener máximo 500 caracteres' })
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        example: 'El rol de usuario normal solo puede ver y editar su perfil',
        description: 'Observación del rol',
    })
    @IsString({ message: 'La observación del rol debe ser un string' })
    @MaxLength(500, { message: 'La observación del rol debe tener máximo 500 caracteres' })
    @IsOptional()
    observacion?: string;
}
