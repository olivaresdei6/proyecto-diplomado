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


@Entity({name: 'libro'})
export class LibroEntity {

    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada libro ',
    })
    @PrimaryGeneratedColumn("increment", {
        type: 'bigint',
        unsigned: true,
        zerofill: false,
        comment: 'Identificador único de cada libro',
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
        comment: "UUID de cada libro. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        example: '100 años de soledad',
        description: 'Título del libro',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 500,
    })
    titulo!: string;

    @ApiProperty({
        example: 'Gabriel García Márquez',
        description: 'Autor del libro',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 200,
        default: ''
    })
    autor!: string;


    @ApiProperty({
        example: 'https://www.pixabay.com/imagen.jpg',
        description: 'URL de la imagen del libro',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        comment: 'URL de la imagen del libro',
    })
    url!: string;

    @ApiProperty({
        example: 'Este libro que trata de un pueblo llamado Macond, en el que...',
        description: 'Descripción del libro',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 800,
        comment: 'Descripción del libro',
    })
    descripcion!: string;

    @ApiProperty({
        example: 'Este libro que trata de un pueblo llamado Macond, en el que...',
        description: 'Descripción del libro',
        nullable: false,
    })
    @Column('varchar', {
        nullable: false,
        length: 200,
        comment: 'Unidades disponibles del libro',
    })
    unidades!: number;

    @ApiProperty({
        example: 5,
        description: 'Unidades disponibles del libro',
        nullable: false,
    })
    @Column('int', {
        nullable: false,
        comment: 'Unidades disponibles del libro',
    })
    unidadesDisponibles!: number;

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

    @OneToMany( () => InventarioEntity, inventario => inventario.libro)
    inventario?: InventarioEntity[];
}
