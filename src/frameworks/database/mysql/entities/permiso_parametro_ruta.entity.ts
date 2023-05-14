import {
    Column,
    Entity, Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import { PermisoParametroEntity, PermisoRutaEntity } from "./index";

@Entity({name: 'permiso_parametro_ruta'})
@Index(['ruta', 'parametro'], { unique: true })
export class PermisoParametroRutaEntity {

    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada relación entre la ruta y el parámetro',
    })
    @PrimaryGeneratedColumn("increment", {
        type: 'int',
        unsigned: true,
        zerofill: false,
        comment: 'Identificador único de cada relación entre la ruta y el parámetro',
    })
    id?: number;

    @ApiProperty({
        description: 'UUID del registro',
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        uniqueItems: true,
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 36,
        comment: "UUID de cada ruta. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        description: 'Descripción de la relación entre la ruta y el parámetro',
        example: 'Descripción de la relación entre la ruta y el parámetro',
        required: false,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
        comment: 'Descripcion de la relación entre la ruta y el parámetro',
    })
    descripcion?: string;

    @ApiProperty({
        description: 'Observacion de la relación entre la ruta y el parámetro',
        example: 'Observacion de la relación entre la ruta y el parámetro',
        required: false,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
        comment: 'Observacion de la relación entre la ruta y el parámetro',
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
        example: 1,
        description: 'Estado de la relacion (1: Activo, 0: Inactivo)',
    })
    @Column('int', {
        default: 1,
        nullable: false,
        comment: 'Estado de la relacion (1: Activo, 0: Inactivo)'
    })
    estado?: number;

    @ApiProperty({
        example: 1,
        description: 'Identificador único de la ruta',
    })
    @ManyToOne(() => PermisoRutaEntity, permisoRuta => permisoRuta.id, { nullable: false, eager: true })
    @JoinColumn({name: 'id_ruta'})
    ruta!: number | PermisoRutaEntity

    @ApiProperty({
        example: 1,
        description: 'Identificador único del parámetro',
    })
    @ManyToOne(() => PermisoParametroEntity, permisoParametro => permisoParametro.id, { nullable: false, eager: true })
    @JoinColumn({name: 'id_parametro'})
    parametro!: number | PermisoParametroEntity
}
