import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import { PermisoEntity } from "./permiso.entity";


@Entity({name: 'permiso_modulo'})
@Index("unq_permiso_nombre_modulo", ["nombre", "rutaModulo"], {unique: true})
export class PermisoModuloEntity {

    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada modulo. ',
    })
    @PrimaryGeneratedColumn("increment", {
        type: 'int',
        unsigned: true,
        zerofill: false,
        comment: 'Identificador único de cada modulo.',
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
        comment: "UUID de cada modulo. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;
    
    @ApiProperty({
        example: 'Usuarios',
        description: 'Nombre del módulo',
    })
    @Column('varchar', {
        nullable: false,
        unique: true,
        length: 200,
        comment: 'Nombre del módulo'
    })
    nombre?: string;
    
    @ApiProperty({
        example: '/usuarios',
        description: 'Ruta principal del modulo seleccionado'
    })
    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        name: 'ruta_modulo',
        length: 200,
        comment: 'Ruta principal del modulo registrado'
    })
    rutaModulo: string;
    
    
    @ApiProperty({
        example: 'Módulo de usuarios',
        description: 'Descripción del módulo',
    })
    @Column('varchar', {
        nullable: true,
        length: 500,
        comment: 'Descripción del módulo'
    })
    descripcion?: string;

    @ApiProperty({
        example: 'Módulo de usuarios',
        description: 'Observación del módulo',
    })
    @Column('varchar', {
        nullable: true,
        length: 500,
        comment: 'Observación del módulo'
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
        description: 'Estado del modulo (1: Activo, 0: Inactivo)',
    })
    @Column('int', {
        default: 1,
        nullable: false,
        comment: 'Estado del modulo (1: Activo, 0: Inactivo)'
    })
    estado?: number;
    
    @OneToMany(() => PermisoEntity, permisoRolModuloRuta => permisoRolModuloRuta.modulo)
    permisos?: PermisoEntity[];
}
