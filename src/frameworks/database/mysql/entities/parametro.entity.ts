import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ValorParametroEntity } from "./";

/**
 * Entidad que representa la tabla parametro. Esta tabla representa los parámetros que se pueden configurar en la aplicación. Ejemplo: colores, tipos de documento, tipos de usuario, etc.
 * Se agrupan tablas que tienen un comportamiento similar y campos similares para evitar la creación de tablas innecesarias
 */
@Entity("parametro")
export class ParametroEntity {
    @ApiProperty({
        example: 1,
        description: "Identificador del parámetro",
        uniqueItems: true
    })
    @PrimaryGeneratedColumn({
        name: "id",
        type: "int",
        unsigned: true,
        comment: "Identificador del parámetro"
    })
    id?: number;

    @ApiProperty({
        description: "UUID del parámetro",
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 36,
        comment: "UUID del parámetro. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;


    @ApiProperty({
        example: "colores",
        description: "Nombre del parámetro",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 200,
        comment: "Nombre del parámetro. Un parámetro puede ser: colores, tipos de documento, tipos de usuario, etc. Se agrupan tablas que tienen un comportamiento similar y campos similares para evitar la creación de tablas innecesarias"
    })
    nombre!: string;

    @ApiProperty({
        description: "Descripción del parámetro",
        example: "Colores de los productos de la tienda",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: true,
        length: 500,
        comment: "Descripción del parámetro. Se utiliza para describir el parámetro y su funcionalidad. No es obligatorio, pero se recomienda llenar este campo para facilitar la comprensión de la funcionalidad del parámetro"
    })
    descripcion?: string;

    @ApiProperty({
        description: "Descripción del parámetro",
        example: "Colores de los productos de la tienda",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: true,
        length: 500,
        comment: "Observacion del parámetro."
    })
    observacion?: string;


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
        nullable: true,
        name: "fecha_actualizacion",
        comment: "Fecha de actualización del registro. Se genera automáticamente al momento de actualizar el registro",
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    fechaActualizacion?: Date;

    @ApiProperty({
        description: "Estado del registro. 1. Activo, 2. Inactivo, O. Eliminado",
        example: 1
    })
    @Column({
        type: "int",
        nullable: false,
        comment: "Estado del registro. 1. Activo, 2. Inactivo, O. Eliminado",
        default: 1
    })
    estado?: number;

    @OneToMany(
        () => ValorParametroEntity,
        (valorParametro) => valorParametro.parametro,
    )
    valoresParametro?: ValorParametroEntity[];
}
