import {ApiProperty} from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Matches,
    MaxLength,
} from "class-validator";

export class CrearUsuarioDto {
    
    @ApiProperty({
        example: 'Juan Carlos',
        description: 'Nombres del usuario',
        nullable: false,
    })
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @MaxLength(30, { message: 'El nombre no puede tener más de 30 caracteres' })
    nombre!: string;
    
    
    @ApiProperty({
        example: 'Perez',
        description: 'Apellidos del usuario',
        nullable: false,
    })
    @IsString({ message: 'El apellido debe ser un texto' })
    @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
    @MaxLength(30, { message: 'El apellido no puede tener más de 30 caracteres' })
    apellido!: string;
    
    
    @ApiProperty({
        example: 'juanito@gmail.com',
        description: 'Correo electrónico del usuario',
        nullable: false,
    })
    @IsEmail({}, { message: 'El correo electrónico debe ser un correo electrónico válido' })
    @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
    @MaxLength(50, { message: 'El correo electrónico no puede tener más de 50 caracteres' })
    correo!: string;
    
    
    @ApiProperty({
        example: '3181234567',
        description: 'Número de teléfono del usuario',
        nullable: true,
    })
    @IsString({ message: 'El número de teléfono debe ser un texto' })
    @MaxLength(15, { message: 'El número de teléfono no puede tener más de 10 caracteres' })
    @IsPhoneNumber('CO', { message: 'El número de teléfono debe ser un número de teléfono válido' })
    @IsOptional()
    telefono?: string;
    
    
    @ApiProperty({
        example: '123456',
        description: 'Contraseña del usuario',
        nullable: false,
    })
    @IsString({ message: 'La contraseña debe ser un texto' })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    password!: string;
}
