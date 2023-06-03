import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { IConexionDb } from "../../frameworks/database/mysql/core/abstract";
import { RegistroDeAccesoEntity, UsuarioEntity } from "../../frameworks/database/mysql/entities";
import * as bcrypt from "bcrypt";
import { ActualizarUsuarioDto, CrearUsuarioDto, LoginUsuarioDto } from "./dto";
import { generateCodeAuth } from "../../helpers/generateCodeAuth";
import { MailerService } from "@nestjs-modules/mailer";
import { MailService } from "../../frameworks/mails/mail.service";
import {JwtService} from "@nestjs/jwt";
import { envConfiguration } from "../../config/env.config";
import { JwtPayload } from "./interfaces/jwt.payload.interface";
import { camposDeBusquedaGenericos } from "../../objetos-genericos/campos-de-busqueda.generic";
import {
    RespuestaPaginadaInterface
} from "../../frameworks/database/mysql/core/interfaces/respuesta_paginada.interface";

@Injectable()
export class UsuarioService {
    constructor(
        private readonly servicioDeBaseDeDatos: IConexionDb,
        private readonly mailerService: MailerService,
        private readonly emailService: MailService,
        private readonly jwtService: JwtService,


    ) {}
    
    
    async registrarUsuario(crearUsuarioDto: CrearUsuarioDto, rol: string)  {
        const {password} = crearUsuarioDto;
        const codigoAutenticacion = generateCodeAuth();
        // Encripto la contraseña
        const salt = await bcrypt.genSalt( 10 );
        const passwordEncriptada = await bcrypt.hash( password, salt );
        const tipoUsuario =  await this.servicioDeBaseDeDatos.permisoRol.obtenerUnRegistroPor(
            {where: {nombre: rol}}, 'Rol',
        );
        if (!tipoUsuario) {
            throw new NotFoundException('No se encontro un rol en el sistema con los datos ingresados');
        }
        await this.servicioDeBaseDeDatos.usuario.crearRegistro({
            ...crearUsuarioDto, password: passwordEncriptada, rol: tipoUsuario, codigoAutenticacion, estaActivo: true
        });
        // const isSendEmail = await this.emailService.userMail.sendConfirmationEmail(crearUsuarioDto.correo, crearUsuarioDto.nombre, codigoAutenticacion, this.mailerService);
        /*if (isSendEmail) {
            return {
                status: 201,
                message: 'Usuario creado correctamente. Revisa mailtrap para activar tu cuenta',
            }
        }*/
        return {
            status: 201,
            message: 'Usuario creado correctamente'
        }

    }

    async activarCuenta(codigoAutenticacion: string) {
        const usuario = await this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor(
            {where: {codigoAutenticacion}}, 'Usuario',
        );
        if (!usuario) {
            throw new NotFoundException('No se encontro un usuario en el sistema con los datos ingresados');
        }
        const {id} = usuario;
        await this.servicioDeBaseDeDatos.usuario.actualizarRegistro(id, {estaActivo: true, codigoAutenticacion: generateCodeAuth()});
        return {
            status: 200,
            message: 'Cuenta activada correctamente. Se realiza una peticion get, no es lo ideal, pero no alcanze a hacer el front la expongo directamente aunque lo ideal seria que en el correo se enviara un link con el codigo de autenticacion y se redirigiera a la pagina de login',
        }
    }

    async iniciarSesion({correo, password}: LoginUsuarioDto) {
        const usuarioEncontrado = await this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor(
            {where: {correo}}, 'Usuario',
        );
        if (!usuarioEncontrado) {
            throw new NotFoundException('No se encontro un usuario en el sistema con los datos ingresados');
        }
        const {password: passwordUsuario, id} = usuarioEncontrado;
        const passwordValida = await bcrypt.compare(password, passwordUsuario);
        if (!passwordValida) {
            throw new NotFoundException('No se encontro un usuario en el sistema con los datos ingresados')
        }

        if (usuarioEncontrado.estaActivo === false) {
            throw new ForbiddenException('El usuario no esta activo en el sistema. Por favor revise su correo para activar su cuenta')
        }

        const token = await this.registrarToken(id);

        return {
            status: 200,
            message: 'Inicio de sesión correcto',
            data: {
                id,
                token,
                // @ts-ignore
                rol: usuarioEncontrado.rol.nombre,
            }
        }
    }
    
    async obtenerTodosLosUsuarios() {
        const usuarios =  await this.servicioDeBaseDeDatos.usuario.obtenerRegistros();
        return usuarios.map(usuario => {
            const {password, ...resto} = usuario;
            return resto;
        });
    }

    async obtenerUsuariosPaginados(limite: number, pagina: number, busqueda?: string, campo?: string) {
        let usuarios : RespuestaPaginadaInterface<UsuarioEntity>;
        if (campo && !camposDeBusquedaGenericos.includes(campo.toLowerCase())) {
            throw new BadRequestException('El campo enviado no es permitido. Se esperaba uno de estos: ' + camposDeBusquedaGenericos.join(', '));
        }
        else if (busqueda && campo) {
            usuarios = await this.servicioDeBaseDeDatos.usuario.obtenerRegistrosPaginados({limite, pagina, busqueda, campo});
        }else {
            usuarios =  await this.servicioDeBaseDeDatos.usuario.obtenerRegistrosPaginados({limite, pagina});
        }
        const {cantidadTotalDeRegistros, paginaActual, paginasTotales, registrosPaginados} = usuarios;
        return {
            status: 200,
            message: 'Usuarios obtenidos correctamente',
            data: {
                cantidadTotalDeRegistros,
                paginaActual,
                paginasTotales,
                registrosPaginados: registrosPaginados.map(usuario => {
                    const {password, ...resto} = usuario;
                    return resto;
                })
            }
        }
    }
    
    async obtenerUnUsuario(id: number) {
        const usuario =  await this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor({where: {id}}, 'Parámetro');
        if (!usuario) {
            throw new NotFoundException('No se encontro un usuario en el sistema con los datos ingresados');
        }else{
            const {password, ...resto} = usuario;
            return {
                status: 200,
                message: 'Usuario obtenido correctamente',
                data: resto,
            }
        }
    }
    
    async actualizarRegistro(id: number, actualizarUsuarioDto: ActualizarUsuarioDto)  {
        const {password} = actualizarUsuarioDto;
        if (password) {
            const salt = await bcrypt.genSalt( 10 );
            actualizarUsuarioDto.password = await bcrypt.hash(password, salt);
        }
        const usuario = await this.servicioDeBaseDeDatos.usuario.actualizarRegistro(id, actualizarUsuarioDto);
        if (!usuario) {
            throw new NotFoundException('No se encontro un usuario en el sistema con los datos ingresados');
        }else{
            const {password, ...resto} = usuario;
            return {
                status: 200,
                message: 'Usuario actualizado correctamente',
                data: resto,
            }
        }
    }

    private async registrarToken(id: number) {
        const token  = this.getToken({id});
        const { exp } = await this.extraerDataToken(token);
        const fechaDeExpiracionToken = new Date(exp * 1000);
        await this.servicioDeBaseDeDatos.registroDeAcceso.crearRegistro({
            fechaDeExpiracionToken,
            token,
            usuario: id,
        });
        return token;

    }

    public async cerrarSesion(token: string) {
        const {id, fechaDeSalida}: RegistroDeAccesoEntity = await this.servicioDeBaseDeDatos.registroDeAcceso.obtenerUnRegistroPor({where: {token}}, 'Registro de acceso');
        if(fechaDeSalida) {
            throw new BadRequestException('La sesion ya ha sido cerrada anteriormente');
        }else{
            await this.servicioDeBaseDeDatos.registroDeAcceso.actualizarRegistro(+id, {fechaDeSalida: new Date()});
            return { message: 'Sección cerrada correctamente', token}
        }

    }


    private getToken(payload: JwtPayload) : string {
        return this.jwtService.sign(payload, {algorithm: 'HS512'});
    }

    private async extraerDataToken(token: string) {
        const { exp, id } = this.jwtService.verify(token, {secret: envConfiguration().jwtSecret});
        return { exp, id };
    }
}
