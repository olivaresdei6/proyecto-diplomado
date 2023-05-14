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
import { LibroEntity } from "./libro.entity";
import { UsuarioEntity } from "./usuario.entity";
import { ParametroEntity } from "./parametro.entity";


@Entity({name: 'inventario'})
export class InventarioEntity {

    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada inventario ',
    })
    @PrimaryGeneratedColumn("increment", {
        type: 'bigint',
        unsigned: true,
        zerofill: false,
        comment: 'Identificador único de cada inventario',
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
        comment: "UUID de cada inventario. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;

    @ApiProperty({
        example: 'Se presto en buen estado',
        description: 'Observaciones del prestamo',
        nullable: false,
    })
    @Column('varchar', {
        nullable: true,
        length: 500,
        comment: 'Observaciones del prestamo',
        name: "observaciones_prestamo"
    })
    dobservacionesPrestamo?: string;

    @ApiProperty({
        example: 'Se devolvio en buen estado',
        description: 'Observaciones de la devolución',
        nullable: false,
    })
    @Column('varchar', {
        nullable: true,
        length: 500,
        comment: 'Observaciones de la devolución',
        name: "observaciones_devolucion"
    })
    observacionesDevolucion?: string;

    @ApiProperty({
        description: "Fecha del prestamo",
        example: "2021-01-01 00:00:00"
    })
    @Column({
        type: "timestamp",
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: "fecha_prestamo",
        comment: "Fecha del prestamo. Se genera automáticamente al momento de crear el registro"
    })
    fechaPrestamo?: Date;

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
        description: "Fecha de devolución esperada",
        example: "2021-01-01 00:00:00"
    })
    @Column({
        type: "timestamp",
        nullable: false,
        name: "fecha_devolucion_esperada",
        comment: "Fecha de  de devolución esperada.",
    })
    fechaDevolucionEsperada!: Date;

    @ApiProperty({
        description: "Fecha de devolución",
        example: "2021-01-01 00:00:00"
    })
    @Column({
        type: "timestamp",
        nullable: true,
        name: "fecha_devolucion",
        comment: "Fecha de devolución",
    })
    fechaDeLaDevolucion?: Date;


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

    @ManyToOne( () => LibroEntity, libro => libro.id, { eager: true })
    @JoinColumn({ name: 'libro_id'})
    @ApiProperty({
        description: 'Libro al que pertenece el inventario',
        example: 1,
    })
    libro!: LibroEntity | number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.id, { eager: true })
    @JoinColumn({ name: 'usuario_id'})
    @ApiProperty({
        description: 'Usuario al que pertenece el inventario',
        example: 1,
    })
    @Type(() => UsuarioEntity)
    usuario!: UsuarioEntity | number;

}
