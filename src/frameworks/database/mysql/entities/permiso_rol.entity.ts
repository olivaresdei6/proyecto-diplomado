import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {ApiProperty} from "@nestjs/swagger";
import { PermisoEntity, UsuarioEntity } from "./index";

@Entity({name: 'permiso_rol'})
export class PermisoRolEntity {

    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada rol. ',
    })
    @PrimaryGeneratedColumn("increment", {
        type: 'smallint',
        unsigned: true,
        zerofill: false,
        comment: 'Identificador único de cada rol.',
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
        comment: "UUID de cada rol. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        description: 'Nombre del rol',
        example: 'super administrador',
        required: true
    })
    @Column('varchar', {
        length: 150,
        nullable: false,
        comment: 'Nombre del rol'
    })
    nombre!: string;
    
    @ApiProperty({
        description: 'Descripción del rol',
        example: 'Rol que le permite ver, crear, actualizar y eliminar sus datos a un usuario natural',
        required: true
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
        comment: 'Descripción del rol'
    })
    descripcion?: string;

    @ApiProperty({
        description: 'Observacion del rol',
        example: 'Se debe tener cuidado con este rol',
        required: true
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
        comment: 'Observacion del rol'
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
        description: 'Estado del rol (1: Activo, 0: Inactivo)',
    })
    @Column('int', {
        default: 1,
        nullable: false,
        comment: 'Estado del rol (1: Activo, 0: Inactivo)'
    })
    estado?: number;
    
    /**
     * Relaciones de la tabla de roles con otras tablas de la base de datos.
     */

    @OneToMany(() => UsuarioEntity, usuario => usuario.rol)
    rolesUsuario?: UsuarioEntity[];
    
    @OneToMany(() => PermisoEntity, PermisoRolModuloRuta => PermisoRolModuloRuta.rol)
    permisos?: PermisoEntity[];
}
