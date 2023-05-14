import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InventarioEntity } from "../../frameworks/database/mysql/entities";
import { CrearPrestamoDto } from "./dto/crear-prestamo.dto";
import { CrearDevolucionDto } from "./dto/crear-devolucion.dto";
import { roles } from "../usuario/objects/roles";


@Injectable()
export class InventarioService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}

    async registrarPrestamo(crearPrestamoDto: CrearPrestamoDto, uuidUsuario: string)  {
        const {uuidLibro} = crearPrestamoDto;
        // Verificon que el libro y el usuario existan
        const [libro, usuario] = await Promise.all([
            this.servicioDeBaseDeDatos.libro.obtenerUnRegistroPor({where: {uuid: uuidLibro}}, 'Libro', false),
            this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor({where: {uuid: uuidUsuario}}, 'Usuario', false)
        ]);
        if (!libro) {
            throw new BadRequestException('El libro no existe');
        }
        if (!usuario) {
            throw new BadRequestException('El usuario no existe');
        }
        if (libro.unidadesDisponibles === 0) {
            throw new BadRequestException('El libro no tiene unidades disponibles');
        }
        const prestamos = (await this.servicioDeBaseDeDatos.inventario.obtenerRegistros());
        // @ts-ignore
        const prestamosPendientes = prestamos.filter(prestamo => prestamo.usuario.id === usuario.id && prestamo.libro.id === libro.id && prestamo.estado === 1);
        if (prestamosPendientes.length > 0) {
            throw new BadRequestException('El usuario ya tiene un prestamo pendiente de este libro');
        }
        const prestamo =  await this.servicioDeBaseDeDatos.inventario.crearRegistro({...crearPrestamoDto, usuario: usuario.id, libro: libro.id});
        await  this.servicioDeBaseDeDatos.libro.actualizarRegistro(uuidLibro, {unidadesDisponibles: libro.unidadesDisponibles - 1});
        if (prestamo) {
            return {
                status: 201,
                message: 'Prestamo creado correctamente',
                data: libro
            }
        }
    }

    async registrarDevolucion(registrarDevolucionDto: CrearDevolucionDto, uuidUsuario: string)  {
        const {uuidPrestamo} = registrarDevolucionDto;
        // Verificon que el libro y el usuario existan
        const [prestamo, usuario] = await Promise.all([
            this.servicioDeBaseDeDatos.inventario.obtenerUnRegistroPor({where: {uuid: uuidPrestamo}}, 'Inventario', false),
            this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor({where: {uuid: uuidUsuario}}, 'Usuario', false)
        ]);
        if (!prestamo) {
            throw new BadRequestException('El prestamo no existe');
        }
        if (!usuario) {
            throw new BadRequestException('El usuario no existe');
        }
        const devolucion =  await this.servicioDeBaseDeDatos.inventario.actualizarRegistro(uuidPrestamo, {...registrarDevolucionDto, usuario: usuario.id, fechaDeLaDevolucion: new Date(), estado: 2});
        // @ts-ignore
        await this.servicioDeBaseDeDatos.libro.actualizarRegistro(prestamo.libro.uuid, {unidadesDisponibles: prestamo.libro.unidadesDisponibles + 1});
        if (devolucion) {
            return {
                status: 201,
                message: 'Devolucion creada correctamente',
                data: devolucion
            }
        }
    }

    async obtenerDevoluciones(id: number){
        console.log('Rol: ');
        const devoluciones = await this.servicioDeBaseDeDatos.inventario.obtenerRegistros();
        const usuario = await this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor({where: {id}}, 'Usuario', false);
        // @ts-ignore
        const rol = usuario.rol.nombre;
        if (devoluciones) {
            if ( rol === roles.usuarioAdministrador || rol === roles.usuarioSuperAdministrador) {
                return {
                    status: 200,
                    message: 'Devoluciones obtenidas correctamente',
                    data: devoluciones
                }
            }else{
                return {
                    status: 200,
                    message: 'Devoluciones obtenidas correctamente',
                    // @ts-ignore
                    data: devoluciones.filter(devolucion => devolucion.estado === 2 && devolucion.usuario.id === id)
                }
            }
        }
    }

    async obtenerPrestamos(){
        const prestamos = await this.servicioDeBaseDeDatos.inventario.obtenerRegistros();
        if (prestamos) {
            return {
                status: 200,
                message: 'Prestamos obtenidos correctamente',
                data: prestamos.filter(prestamo => prestamo.estado === 1)
            }
        }
    }

    async obtenerPrestamosDeUnUsuario(uuidUsuario: string){
        const prestamos = await this.servicioDeBaseDeDatos.inventario.obtenerRegistros();
        if (prestamos) {
            // @ts-ignore
            const prestamosDelUsuario = prestamos.filter(prestamo => prestamo.usuario.uuid === uuidUsuario);
            return {
                status: 200,
                message: 'Prestamos obtenidos correctamente',
                data: prestamosDelUsuario
            }
        }
    }


    async obtenerUnRegistro(uuid: string): Promise<InventarioEntity> {
        const respuesta =  await this.servicioDeBaseDeDatos.inventario.obtenerUnRegistroPor({where: {uuid}}, 'Inventario', false);
        if (respuesta) {
            return respuesta;
        }else {
            throw new BadRequestException('No se encontró el inventario');
        }
    }

}
