import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import { RegistroDeAccesoEntity } from "./registro_de_acceso.entity";
import { PermisoRolEntity } from "./permiso_rol.entity";
import { InventarioEntity } from "./inventario.entity";


@Entity({name: 'usuario'})
export class UsuarioEntity {

    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada usuario. ',
    })
    @PrimaryGeneratedColumn("increment", {
        type: 'bigint',
        unsigned: true,
        zerofill: false,
        comment: 'Identificador único de cada usuario.',
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
        comment: "UUID de cada usuario. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;


    @ApiProperty({
        example: 'a13nk9i8yt78h743t7',
        description: 'Código único de autenticación de cada usuario',
    })
    @Column('varchar', {
        nullable: true,
        length: 36,
        comment: 'Código único de autenticación de cada usuario. Se debe generar un código al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible',
        name: 'codigo_autenticacion'
    })
    codigoAutenticacion!: string;

    @ApiProperty({
        example: 'Juan',
        description: 'Nombre del usuario',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 500,
    })
    nombre!: string;

    @ApiProperty({
        example: 'Perez',
        description: 'Apellido del usuario',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 100,
        default: ''
    })
    apellido!: string;


    @ApiProperty({
        example: 'juanito@gmail.com',
        description: 'Correo electrónico del usuario',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        unique: true,
        length: 200,
        comment: 'Correo electrónico del usuario. Se debe validar que no exista en la base de datos',
    })
    correo!: string;


    @ApiProperty({
        example: '321654987',
        description: 'Teléfono del usuario',
        nullable: true,
    })
    @Column('varchar', {
        nullable: true,
        unique: true,
        comment: 'Teléfono del usuario. Se debe validar que no exista en la base de datos',
        length: 200,
    })
    telefono?: string;


    @ApiProperty({
        example: '123456',
        description: 'Contraseña del usuario',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        comment: 'Contraseña del usuario. Se debe encriptar antes de guardar en la base de datos',
    })
    password!: string;


    @Column('boolean', {
        nullable: false,
        default: false,
        name: 'esta_activo',
        comment: 'Indica si el usuario se encuentra activo o no. Por defecto, el usuario se crea inactivo y debe activarse via correo electrónico',
    })
    estaActivo?: boolean;


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
        description: 'Estado del usuario (1, disponible, 2: bloqueado, 3: eliminado)',
    })
    @Column('tinyint', {
        default: 1,
        nullable: false,
        comment: 'Estado del usuario 1, disponible, 2: bloqueado, 3: eliminado)'
    })
    estado?: number;
    @ApiProperty({
        description: 'Rol del usuario',
        type: () => [PermisoRolEntity],
    })
    @ManyToOne(() => PermisoRolEntity, permisoRol => permisoRol.id, { eager: true, nullable: false })
    @JoinColumn({ name: 'id_rol' })
    rol!: number | PermisoRolEntity;


    @Type(() => RegistroDeAccesoEntity)
    @ApiProperty({
        description: 'Registros de acceso del usuario',
        type: () => [RegistroDeAccesoEntity],
    })
    @OneToMany(() => RegistroDeAccesoEntity, registroDeAcceso => registroDeAcceso.usuario)
    registroDeAcceso?: RegistroDeAccesoEntity[];

    @OneToMany(() => InventarioEntity, inventario => inventario.usuario)
    inventario?: InventarioEntity[];
}
