import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InventarioEntity } from "../../frameworks/database/mysql/entities";
import { CrearPrestamoDto } from "./dto/crear-prestamo.dto";
import { CrearDevolucionDto } from "./dto/crear-devolucion.dto";
import { roles } from "../usuario/objects/roles";


@Injectable()
export class InventarioService {
    constructor( private readonly servicioDeBaseDeDatos: IConexionDb) {}

    async registrarPrestamo(crearPrestamoDto: CrearPrestamoDto, idUsuario: number)  {
        const {idLibro} = crearPrestamoDto;
        // Verificon que el libro y el usuario existan
        const [libro, usuario] = await Promise.all([
            this.servicioDeBaseDeDatos.libro.obtenerUnRegistroPor({where: {id: idLibro}}, 'Libro', false),
            this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor({where: {id: idUsuario}}, 'Usuario', false)
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
        await  this.servicioDeBaseDeDatos.libro.actualizarRegistro(idLibro, {unidadesDisponibles: libro.unidadesDisponibles - 1});
        if (prestamo) {
            return {
                status: 201,
                message: 'Prestamo creado correctamente',
                data: libro
            }
        }
    }

    async registrarDevolucion(registrarDevolucionDto: CrearDevolucionDto, idUsuario: number)  {
        const {idPrestamo} = registrarDevolucionDto;
        console.log('registrarDevolucionDto: ', registrarDevolucionDto);
        // Verificon que el libro y el usuario existan
        const [prestamo, usuario] = await Promise.all([
            this.servicioDeBaseDeDatos.inventario.obtenerUnRegistroPor({where: {id: idPrestamo}}, 'Inventario', false),
            this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor({where: {id: idUsuario}}, 'Usuario', false)
        ]);
        if (!prestamo) {
            throw new BadRequestException('El prestamo no existe');
        }
        if (!usuario) {
            throw new BadRequestException('El usuario no existe');
        }
        console.log('prestamo: ', prestamo);
        const devolucion =  await this.servicioDeBaseDeDatos.inventario.actualizarRegistro(idPrestamo, {...registrarDevolucionDto, usuario: +usuario.id, fechaDeLaDevolucion: new Date(), estado: 2});
        // @ts-ignore
        await this.servicioDeBaseDeDatos.libro.actualizarRegistro(+prestamo.libro.id, {unidadesDisponibles: prestamo.libro.unidadesDisponibles + 1});
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

    async obtenerPrestamosDeUnUsuario(idUsuario: number){
        console.log('idUsuario: ', idUsuario);
        const prestamos = await this.servicioDeBaseDeDatos.inventario.obtenerRegistros();
        if (prestamos) {
            console.log('prestamos: ', prestamos.filter(prestamo => prestamo.estado === 1));
            // @ts-ignore
            const prestamosDelUsuario = prestamos.filter(prestamo => parseInt(prestamo.usuario.id) === idUsuario);
            return {
                status: 200,
                message: 'Prestamos obtenidos correctamente',
                data: prestamosDelUsuario
            }
        }
    }


    async obtenerUnRegistro(id: number): Promise<InventarioEntity> {
        const respuesta =  await this.servicioDeBaseDeDatos.inventario.obtenerUnRegistroPor({where: {id}}, 'Inventario', false);
        if (respuesta) {
            return respuesta;
        }else {
            throw new BadRequestException('No se encontró el inventario');
        }
    }

}
