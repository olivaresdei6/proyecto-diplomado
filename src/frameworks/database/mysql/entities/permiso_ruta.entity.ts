import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import { PermisoEntity, PermisoParametroRutaEntity } from "./index";

@Entity({name: 'permiso_ruta'})
@Index(['ruta', 'nombre', 'metodoHttp'], {unique: true})
export class PermisoRutaEntity {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada ruta. ',
    })
    @PrimaryGeneratedColumn("increment", {
        type: 'smallint',
        unsigned: true,
        zerofill: false,
        comment: 'Identificador único de cada ruta.',
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
        description: 'Nombre de la ruta',
        example: 'crear usuario',
        required: true
    })
    @Column('varchar', {
        length: 200,
        nullable: false,
        comment: 'Nombre de la ruta'
    })
    nombre!: string;


    @ApiProperty({
        description: 'Ubicación de la ruta',
        example: '/crear_usuario',
        required: true,
    })
    @Column('varchar', {
        length: 200,
        nullable: false,
        default: '',
        comment: 'Ubicación de la ruta'
    })
    ruta?: string;

    @ApiProperty({
        description: 'Método de la acción. Ejemplo: GET, POST, PUT, DELETE. Cada uno tiene un valor en la tabla valor para su identificación',
        example: 1,
        required: true,
    })
    @Column('int', {
        nullable: false,
        unsigned: true,
        name: 'id_metodo_http',
        comment: 'Método de la acción. Hesto hace referencia a la tabla valor para los métodos de las acciones',
    })
    metodoHttp!: number;

    @ApiProperty({
        description: 'Descripción de la ruta',
        example: 'Descripción de la ruta',
        required: false,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
        comment: 'Observacion de la ruta',
    })
    descripcion?: string;

    @ApiProperty({
        description: 'Observacion de la ruta',
        example: 'Observacion de la ruta',
        required: false,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
        comment: 'Observacion de la ruta',
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
        description: 'Estado de la ruta (1: Activo, 0: Inactivo)',
    })
    @Column('int', {
        default: 1,
        nullable: false,
        comment: 'Estado de la ruta (1: Activo, 0: Inactivo)'
    })
    estado?: number;

    @OneToMany(() => PermisoParametroRutaEntity, permisoParametroDeRuta => permisoParametroDeRuta.parametro)
    permisosParametroRuta?: PermisoParametroRutaEntity[];


    @OneToMany(() => PermisoEntity, permisoRolModuloRuta => permisoRolModuloRuta.ruta)
    permisos?: PermisoEntity[];
    
}
