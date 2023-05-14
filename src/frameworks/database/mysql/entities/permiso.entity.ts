import {
    Column,
    Entity, Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {
    PermisoModuloEntity,
    PermisoParametroEntity,
    PermisoRolEntity,
    PermisoRutaEntity
} from "./index";

@Entity({name: 'permiso'})
@Index(['rol', 'modulo', 'ruta'], {unique: true})
export class PermisoEntity {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada asociación de rol, acción y módulo',
    })
    @PrimaryGeneratedColumn("increment", {
        type: 'smallint',
        unsigned: true,
        zerofill: false,
        comment: 'Identificador único de cada asociación de rol, acción y módulo',
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
        comment: "UUID de cada asociación. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        description: 'Descripción de la asociación',
        example: 'Permiso de crear usuario',
        required: false,
    })
    @Column('varchar', {
        length: 100,
        nullable: true,
        comment: 'Observacion de la asociación',
    })
    descripcion?: string;

    @ApiProperty({
        description: 'Observacion de la ruta',
        example: 'Solo los usuarios con el rol de super administrador pueden crear usuarios administradores',
        required: false,
    })
    @Column('varchar', {
        length: 100,
        nullable: true,
        comment: 'Observacion de la asociación',
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
        description: 'Estado de la asociación (1: Activo, 0: Inactivo)',
    })
    @Column('int', {
        default: 1,
        nullable: false,
        comment: 'Estado de la asociación (1: Activo, 0: Inactivo)'
    })
    estado?: number;
    
    @ManyToOne(() => PermisoRolEntity, permisoRolEntity => permisoRolEntity.id, { nullable: false, eager: true })
    @JoinColumn({name: 'id_rol'})
    rol!: number | PermisoRolEntity;
    
    @ManyToOne(() => PermisoModuloEntity, permisoModulo => permisoModulo.id, { nullable: false, eager: true })
    @JoinColumn({name: 'id_modulo'})
    modulo!: number | PermisoModuloEntity;
    
    @ManyToOne(() => PermisoRutaEntity, permisoRuta => permisoRuta.id, { nullable: false, eager: true  })
    @JoinColumn({name: 'id_ruta'})
    ruta!: number | PermisoRutaEntity;
    
}
