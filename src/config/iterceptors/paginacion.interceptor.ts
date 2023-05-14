import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
/** Este código define un interceptor en NestJS que se encarga de procesar los parámetros de paginación y búsqueda que se
 * envían en una petición HTTP. El interceptor se asegura de que los parámetros sean válidos y los transforma en el formato
 * requerido antes de pasar la petición al siguiente manejador.
 *
 * El interceptor define una clase llamada "PaginacionInterceptor" que implementa la interfaz "NestInterceptor". Esta interfaz
 * define un método llamado "intercept" que se encarga de interceptar las peticiones y devolver una respuesta.

 * En el método "intercept", se obtiene la petición HTTP a través del contexto y se procesan los parámetros de paginación y búsqueda.
 * Luego, se realizan algunas validaciones en los parámetros para asegurarse de que sean válidos. Si alguno de los parámetros no es
 * válido, se lanza una excepción BadRequestException.

 * Finalmente, se actualizan los parámetros de la petición con los valores procesados y se pasa la petición al siguiente manejador
 * mediante el método "next.handle()".
 **/
@Injectable()
export class PaginacionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        let pagina = request.query.pagina ? parseInt(request.query.pagina) : 1;
        let limite = request.query.limite ? parseInt(request.query.limite) : 10;
        let busqueda = request.query.busqueda?.toString();
        let campo = request.query.campo?.toString();

        if (limite && isNaN(limite)) throw new BadRequestException('El limite debe ser un número');
        if (pagina && isNaN(pagina)) throw new BadRequestException('La página debe ser un número');
        if (busqueda?.length > 200 || campo?.length > 200) throw new BadRequestException('La busqueda y el campo no puede tener más de 200 caracteres')
        if (!busqueda && campo) throw new BadRequestException('Si envía el campo, debe enviar la busqueda')
        if (!campo && busqueda) throw new BadRequestException('Si envía la busqueda, debe enviar el campo')

        request.query.pagina = pagina;
        request.query.limite = limite;
        request.query.busqueda = busqueda?.toLowerCase() || undefined;
        request.query.campo = campo?.toLowerCase() || undefined;

        return next.handle();
    }
}
