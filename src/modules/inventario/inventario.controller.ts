import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query, Req,
    UseInterceptors
} from "@nestjs/common";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InventarioEntity, LibroEntity } from "../../frameworks/database/mysql/entities";
import { PaginacionInterceptor } from "../../config/iterceptors/paginacion.interceptor";
import { Auth } from "../../decorators/auth.decorator";
import { InventarioService } from "./inventario.service";
import { CrearPrestamoDto } from "./dto/crear-prestamo.dto";
import { CrearDevolucionDto } from "./dto/crear-devolucion.dto";

@ApiTags("Inventarios")
@Controller('inventario')
@Auth()
export class InventarioController {
    constructor(private readonly inventarioService: InventarioService) {}

    @ApiResponse({ status: 201, description: 'Prestamo creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('/prestamo')
    registrarPrestamo( @Req() req, @Body() crearPrestamoDto: CrearPrestamoDto) {
        const uuidUsuario = req.user.uuid;
        return this.inventarioService.registrarPrestamo(crearPrestamoDto, uuidUsuario);
    }

    @ApiResponse({ status: 201, description: 'Devolución creada correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('/devolucion')
    registrarDevolucion(@Req() req, @Body() crearDevolucionDto: CrearDevolucionDto) {
        const uuidUsuario = req.user.uuid;
        return this.inventarioService.registrarDevolucion(crearDevolucionDto, uuidUsuario);
    }


    @ApiResponse({ status: 201, description: 'Prestamos encontrados correctamente.', type: InventarioEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron prestamos.' })
    @Get('/prestamo/all')
    obtenerTodosLosPrestamos() {
        return this.inventarioService.obtenerPrestamos();
    }

    @ApiResponse({ status: 201, description: 'Devoluciones encontradas correctamente.', type: InventarioEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron devoluciones' })
    @Get('/devolucion/all')
    obtenerDevoluciones(@Req() req) {
        const usuario = req.user;
        return this.inventarioService.obtenerDevoluciones(usuario.rol.nombre, usuario.uuid);
    }


    @ApiResponse({ status: 201, description: 'Inventario encontrado correctamente.', type: InventarioEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El inventario no existe.' })
    @Get(':uuid')
    obtenerUnRegistro(@Param('uuid', ParseUUIDPipe) uuid:string): Promise<InventarioEntity>  {
        return this.inventarioService.obtenerUnRegistro(uuid);
    }

    @ApiResponse({ status: 201, description: 'Prestamos encontrados correctamente.', type: InventarioEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El inventario no existe.' })
    @Get(':uuid')
    obtenerPrestamosDeUnUsuario(@Req() req ): Promise<InventarioEntity>  {
        const uuidUsuario = req.user.uuid;
        return this.inventarioService.obtenerUnRegistro(uuidUsuario);
    }
}
