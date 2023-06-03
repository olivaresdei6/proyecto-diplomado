import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { IConexionDb } from "../frameworks/database/mysql/core/abstract";
import { PermisoRolEntity, UsuarioEntity } from "../frameworks/database/mysql/entities";
import { ResultadoParametrosDeUnaRuta } from "../frameworks/database/mysql/core/interfaces/permisoInterface";

@Injectable()
export class AuthUsuarioGuard implements CanActivate {
    constructor(private readonly servicioDeBaseDeDatos: IConexionDb) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const usuario: UsuarioEntity = this.obtenerUsuarioAutenticado(request);
        const token: string = this.obtenerTokenDeLaSolicitud(request);
        const ruta: string = this.obtenerLaRutaSolicitada(context, request);
        const [rolId, permisos, isTokenValido] = await Promise.all([
            this.obtenerElIdDelRol(usuario),
            //@ts-ignore
            this.obtenerPermisosDelUsuario(usuario.rol.id),
            this.validarToken(token, usuario)
        ]);
        if (isTokenValido && this.verificarSolicitud(permisos, ruta)) {
            return true;
        }
        throw new UnauthorizedException('No tienes permisos para acceder a este recurso');
    }

    private obtenerUsuarioAutenticado(request): UsuarioEntity {
        return request.user;
    }

    private obtenerTokenDeLaSolicitud(request): string {
        for (let i = 0; i < request.rawHeaders.length; i++) {
            if (request.rawHeaders[i] === 'Authorization') {
                return request.rawHeaders[i + 1].split(' ')[1];
            }
        }
    }

    private obtenerLaRutaSolicitada(context: ExecutionContext, request): string {
        const querys  = Object.keys(request.query);
        const parametros = Object.keys(request.params);
        let url = request._parsedUrl.pathname;
        if (querys.length > 0) {
            return url.split('?')[0];
        }
        else if (parametros.length > 0) {
            return context.switchToHttp().getRequest().route.path.replace('/:id', '');
        }
        return url;
    }

    private async obtenerElIdDelRol(usuario: UsuarioEntity): Promise<number> {
        const rol = (await this.servicioDeBaseDeDatos.usuario.obtenerUnRegistroPor(
            // @ts-ignore
            { where: { id: parseInt(usuario.id) } },
            'Usuario',
        )).rol as PermisoRolEntity;

        if (!rol) {
            throw new UnauthorizedException({
                message: 'No tienes permisos para acceder a este recurso',
            });
        }

        return rol.id;
    }

    private async obtenerPermisosDelUsuario(roleId: number): Promise<ResultadoParametrosDeUnaRuta[]> {
        return await this.servicioDeBaseDeDatos.permiso.obtenerPermisos(+roleId);
    }

    private async validarToken(token: string, usuario: UsuarioEntity): Promise<boolean> {
        const registroDeAcceso = await this.servicioDeBaseDeDatos.registroDeAcceso.obtenerUnRegistroPor(
            { where: { token } },
            'Token',
        );
        // @ts-ignore
        const existUsuario = parseInt(registroDeAcceso.usuario.id) === parseInt(usuario.id);

        if (!existUsuario) {
            throw new UnauthorizedException({
                message: 'No tienes permisos para acceder a este recurso',
            });
        }
        const fechaDeExpiracionDelToken = new Date(registroDeAcceso.fechaDeExpiracionToken);
        return Boolean(registroDeAcceso && fechaDeExpiracionDelToken > new Date());
    }

    private verificarSolicitud(permisos: ResultadoParametrosDeUnaRuta[], ruta: string): boolean {

        const permiso = permisos.find(permiso => {
            return permiso.ruta === ruta;
        });
        return !!permiso;

    }
}
