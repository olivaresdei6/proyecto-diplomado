import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { UsuarioEntity } from "./";


@Entity({ name: 'registro_de_acceso' })
export class RegistroDeAccesoEntity {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de cada registro de acceso al sistema. ',
    })
    @PrimaryGeneratedColumn("increment", {
        type: 'bigint',
        unsigned: true,
        zerofill: false,
        comment: 'Identificador único de cada registro de acceso al sistema. ',
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
        comment: "UUID de cada registro de acceso al sistema. Se debe generar un UUID al momento de crear el registro. Se utiliza como mecánismo de seguridad para evitar que se adivine el ID de un registro y se acceda a información sensible"
    })
    uuid?: string;
    
    @ApiProperty({
        example: ' 2021-05-05 12:00:00',
        description: 'Fecha de ingreso del usuario al sistema con un nuevo token de acceso',
    })
    @Column({
        type: "timestamp",
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: "fecha_de_acceso",
        comment: "Fecha de ingreso del usuario al sistema con un nuevo token de acceso",
    })
    fechaDeAcceso?: Date;

    @ApiProperty({
        example: '2021-05-05 12:00:00',
        description: 'Fecha en la que el usuario salió del sistema',
    })
    @Column({
        type: 'timestamp',
        nullable: true,
        default: null,
        name: 'fecha_de_salida',
    })
    fechaDeSalida?: Date;


    @ApiProperty({
        description: 'Token de acceso del usuario',
    })
    @Column({
        type: 'varchar',
        length: 600 ,
        nullable: false,
        comment: 'Token de acceso del usuario',
    })
    token!: string;


    @ApiProperty({
        example: '2023-05-05 12:00:00',
        description: 'Fecha de expiración del token de acceso',
    })
    @Column({
        type: 'timestamp',
        nullable: false,
        name: 'fecha_de_expiracion_token',
        comment: 'Fecha de expiración del token de acceso',
    })
    fechaDeExpiracionToken!: Date;

    @ApiProperty({
        example: 1,
        description: 'Id del usuario que accedió al sistema',
    })
    @ManyToOne(() => UsuarioEntity, usuario => usuario.id, {nullable: false, eager: true})
    @JoinColumn({name: 'id_usuario'})
    usuario!: number | UsuarioEntity;

    @ApiProperty({
        example: 1,
        description: 'Estado del registro de acceso al sistema',
    })
    @Column({
        type: 'int',
        nullable: false,
        default: 1,
        comment: 'Estado del registro de acceso al sistema',
    })
    estado?: number;

}
