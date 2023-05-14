import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'imagen'})
export class ImagenEntity {
    @ApiProperty({
        example: 1,
        description: 'Id de la imagen',
        nullable: false,
    })
    @PrimaryGeneratedColumn({name: 'id', type: 'bigint', unsigned: true})
    id?: number;

    @ApiProperty({
        example: '9n6bc-9n6bc-9n6bc-9n6bc-9n6bc',
        description: 'UUID de la imagen',
        nullable: false,
    })
    @Column({
        name: 'uuid',
        type: 'varchar',
        length: 36,
        nullable: false,
        unique: true,
        comment: 'UUID de la imagen.  Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible'
    })
    uuid?: string;

    @ApiProperty({
        example: 'bolso_totto.png',
        description: 'Nombre original de la imagen',
        nullable: false
    })
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'nombre_original',
        comment: 'Nombre original de la imagen'
    })
    nombreOriginal!: string;

    @ApiProperty({
        example: '9n6bc-9n6bc-9n6bc-9n6bc-9n6bc.png',
        description: 'Nombre de la imagen guardada en el servidor',
        nullable: false
    })
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'nombre_guardado',
        comment: 'Nombre de la imagen guardada en el servidor'
    })
    nombreGuardado!: string;

    @ApiProperty({
        example: 'Logo de la marca Totto',
        description: 'Descripción de la imagen',
        nullable: false
    })
    @Column({
        type: 'varchar',
        length: 500,
        nullable: true,
        name: 'descripcion',
        comment: 'Descripción de la imagen'
    })
    descripcion?: string;

    @ApiProperty({
        example: 'https://storage.googleapis.com/ecommerce-9n6bc.appspot.com/images/9n6bc-9n6bc-9n6bc-9n6bc-9n6bc.png',
        description: 'URL de la imagen',
        nullable: false
    })
    @Column({
        name: 'url',
        type: 'varchar',
        length: 500,
        nullable: false,
        comment: 'URL de la imagen'
    })
    url!: string;

    @ApiProperty({
        example: 123456,
        description: 'Tamaño de la imagen en bytes',
        nullable: false,
    })
    @Column({
        type: 'bigint',
        nullable: false,
        comment: 'Tamaño de la imagen en bytes'
    })
    size!: number

    @ApiProperty({
        example: 'png',
        description: 'Tipo de la imagen',
        nullable: false
    })
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        name: 'tipo_de_imagen',
        comment: 'Tipo de la imagen'
    })
    tipoDeImagen!: string;

    @ApiProperty({
        example: 100,
        description: 'Ancho de la imagen en pixeles',
        nullable: false
    })
    @Column({
        type: 'bigint',
        nullable: false,
        comment: 'Ancho de la imagen en pixeles'
    })
    ancho!: number;

    @ApiProperty({
        example: 100,
        description: 'Alto de la imagen en pixeles',
        nullable: false
    })
    @Column({
        type: 'bigint',
        nullable: false,
        comment: 'Alto de la imagen en pixeles'
    })
    altura!: number;

    @ApiProperty({
        description: "Fecha de creación del registro",
        example: "2021-01-01 00:00:00"
    })
    @Column({
        type: "timestamp",
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: "fecha_creacion",
        comment: "Fecha de creación del registro. Se genera automáticamente al momento de crear el registro"
    })
    fechaCreacion?: Date;

    @ApiProperty({
        description: "Fecha de actualización del registro",
        example: "2021-01-01 00:00:00"
    })
    @Column({
        type: "timestamp",
        nullable: false,
        name: "fecha_actualizacion",
        comment: "Fecha de actualización del registro. Se genera automáticamente al momento de actualizar el registro",
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    fechaActualizacion?: Date;

    @ApiProperty({
        description: 'Estado del registro. 0: Inactivo, 1: Activo',
        example: 1,
        nullable: false
    })
    @Column({
        type: 'int',
        nullable: false,
        name: 'estado',
        comment: 'Estado del registro. 0: Inactivo, 1: Activo',
        default: 1
    })
    estado?: number;
}
