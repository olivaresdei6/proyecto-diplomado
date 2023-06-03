import {
    Body,
    Controller,
    Get,
    Param, ParseIntPipe,
    Post,
    Req,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { InventarioEntity } from "../../frameworks/database/mysql/entities";
import { Auth } from "../../decorators/auth.decorator";
import { InventarioService } from "./inventario.service";
import { CrearPrestamoDto } from "./dto/crear-prestamo.dto";
import { CrearDevolucionDto } from "./dto/crear-devolucion.dto";
import { roles } from "../usuario/objects/roles";

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
        const idUsuario = req.user.id;
        return this.inventarioService.registrarPrestamo(crearPrestamoDto, idUsuario);
    }

    @ApiResponse({ status: 201, description: 'Devolución creada correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('/devolucion')
    registrarDevolucion(@Req() req, @Body() crearDevolucionDto: CrearDevolucionDto) {
        const idUsuario = req.user.id;
        return this.inventarioService.registrarDevolucion(crearDevolucionDto, +idUsuario);
    }


    @ApiResponse({ status: 201, description: 'Prestamos encontrados correctamente.', type: InventarioEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron prestamos.' })
    @Get('/prestamo/all')
    obtenerTodosLosPrestamos(@Req() req) {
        const usuario = req.user;
        const rol = usuario.rol.nombre;
        if (rol === roles.usuarioAdministrador || rol === roles.usuarioSuperAdministrador) {
            return this.inventarioService.obtenerPrestamos();
        } else {
            return this.inventarioService.obtenerPrestamosDeUnUsuario(parseInt(usuario.id));
        }

    }

    @ApiResponse({ status: 201, description: 'Devoluciones encontradas correctamente.', type: InventarioEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron devoluciones' })
    @Get('/devolucion/all')
    obtenerDevoluciones(@Req() req) {
        const id = req.user.id;
        return this.inventarioService.obtenerDevoluciones(+id);
    }


    @ApiResponse({ status: 201, description: 'Inventario encontrado correctamente.', type: InventarioEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El inventario no existe.' })
    @Get(':id')
    obtenerUnRegistro(@Param('id', ParseIntPipe) id:number): Promise<InventarioEntity>  {
        return this.inventarioService.obtenerUnRegistro(id);
    }

    @ApiResponse({ status: 201, description: 'Prestamos encontrados correctamente.', type: InventarioEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El inventario no existe.' })
    @Get(':id')
    obtenerPrestamosDeUnUsuario(@Req() req ): Promise<InventarioEntity>  {
        const idUsuario = req.user.id;
        return this.inventarioService.obtenerUnRegistro(+idUsuario);
    }
}
