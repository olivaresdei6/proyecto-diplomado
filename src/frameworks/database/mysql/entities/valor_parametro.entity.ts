import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ParametroEntity } from "./";

/**
 * Entidad que representa la tabla valor_parametro. Esta tabla representa los valores que se pueden configurar en la aplicación. Ejemplo: colores: #FFFFFF, #000000, #FF0000, etc.
 * Se agrupan tablas que tienen un comportamiento similar y campos similares para evitar la creación de tablas innecesarias
 */
@Entity("valor_parametro")
export class ValorParametroEntity {
    @ApiProperty({
        example: 1,
        description: "Identificador del valor parámetro",
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('increment',{
        type: "int",
        unsigned: true,
        comment: "Identificador del valor parámetro"
    })
    id?: number;

    @ApiProperty({
        description: "UUID del valor parámetro",
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 36,
        comment: "UUID del valor parámetro. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible",
    })
    uuid?: string;


    @ApiProperty({
        example: "#FFFFFF",
        description: "Valor del parámetro",
        uniqueItems: true
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 200,
        name: "nombre",
        comment: "Nombre del valor parámetro. Son como las opciones que se pueden seleccionar en un select. Ejemplo: colores: #FFFFFF, #000000, #FF0000, etc. Un valor parametro es como si fuera una fila de una tabla. Se agrupan tablas que tienen un comportamiento similar y campos similares para evitar la creación de tablas innecesarias y se relacionan con la tabla parametro"
    })
    nombre!: string;

    @ApiProperty({
        description: "Descripción del valor parámetro",
        example: "Color blanco",
    })
    @Column({
        type: "varchar",
        length: 500,
        nullable: true,
        name: "descripcion",
        comment: "Descripción del parámetro. Se utiliza para describir el parámetro y su funcionalidad. No es obligatorio, pero se recomienda llenar este campo para facilitar la comprensión de la funcionalidad del parámetro"
    })
    descripcion?: string;

    @ApiProperty({
        example: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Observaciones del valor parámetro',
        nullable: true
    })
    @Column('varchar', {
        nullable: true,
        comment: 'Observaciones de la valor parámetro',
        length: 500,
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
        nullable: false,
        name: "fecha_actualizacion",
        comment: "Fecha de actualización del registro. Se genera automáticamente al momento de actualizar el registro",
        default: () => 'CURRENT_TIMESTAMP',
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
        name: "estado",
        comment: "Estado del registro. 1. Activo, 2. Inactivo, O. Eliminado",
        default: 1
    })
    estado?: number;


    @ApiProperty({
        description: "Identificador del parámetro",
        example: 1
    })
    @ManyToOne(
        () => ParametroEntity,
        parametro => parametro.id,
        {
            nullable: false,
            eager: true // Cuando se consulte un valor parámetro, se traerá el parámetro al que pertenece
        }
    )
    @JoinColumn({name: "id_parametro"})
    parametro!: number | ParametroEntity;
}
