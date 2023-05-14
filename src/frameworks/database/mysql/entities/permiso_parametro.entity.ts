import {Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import { PermisoParametroRutaEntity} from "./";

@Entity({name: 'permiso_parametro'})
export class PermisoParametroEntity {

    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada parámetro. Entiendase por parámetro, un valor que se le pasa a una ruta para que esta pueda funcionar correctamente',
    })
    @PrimaryGeneratedColumn("increment", {
        type: 'int',
        unsigned: true,
        zerofill: false,
        comment: 'Identificador único de cada parámetro. Entiendase por parámetro, un valor que se le pasa a una ruta para que esta pueda funcionar correctamente',
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
        comment: "UUID de cada parametro. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;
    
    
    @ApiProperty({
        description: 'Nombre del parámetro de ruta',
        example: 'id',
        required: true
    })
    @Column('varchar', {
        length: 200,
        nullable: false,
        unique: true,
        comment: 'Nombre del parámetro de ruta'
    })
    nombre!: string;
    
    
    @ApiProperty({
        description: 'Determina si el parámetro es obligatorio',
        example: true,
        required: true,
    })
    @Column('boolean', {
        nullable: false,
        default: false,
        name: 'es_requerido',
        comment: 'Determina si el parámetro es obligatorio, devolviendo true o false'
    })
    esRequerido?: boolean;
    
    
    @ApiProperty({
        description: 'Tipo de dato del parámetro',
        example: 1,
        required: true,
    })
    @Column('int', {
        nullable: false,
        comment: 'Id del tipo de dato del parámetro',
        name: 'id_tipo_de_dato'
    })
    tipoDeDato!: number;
    
    @ApiProperty({
        description: 'Descripción del tipo de dato del parámetro',
        example: 'Descripción del tipo de dato del parámetro',
        required: false,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
        comment: 'Descripción del tipo de dato del parámetro',
    })
    descripcion?: string;

    @ApiProperty({
        description: 'Observacion del parámetro',
        example: 'Observacion del parámetro',
        required: false,
    })
    @Column('varchar', {
        length: 500,
        nullable: true,
        comment: 'Observacion del parámetro',
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
        description: 'Estado del parametro (1: Activo, 0: Inactivo)',
    })
    @Column('int', {
        default: 1,
        nullable: false,
        comment: 'Estado del parametro (1: Activo, 0: Inactivo)'
    })
    estado?: number;

    @OneToMany(() => PermisoParametroRutaEntity, permisoParametroRuta => permisoParametroRuta.parametro)
    permisosParametrosRuta?: PermisoParametroRutaEntity[];
    
}
