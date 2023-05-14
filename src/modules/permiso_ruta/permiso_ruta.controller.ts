import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    UseInterceptors
} from "@nestjs/common";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
    LibroEntity,
    PermisoParametroEntity,
    PermisoParametroRutaEntity,
    PermisoRutaEntity, ValorParametroEntity
} from "../../frameworks/database/mysql/entities";
import { PaginacionInterceptor } from "../../config/iterceptors/paginacion.interceptor";
import { ActualizarPermisoRutaDto } from "./dto/actualizar-permiso-ruta.dto";
import { CrearPermisoRutaDto } from "./dto/crear-permiso-ruta.dto";
import { PermisoRutaService } from "./permiso_ruta.service";
import { CrearRelacionRutaParametroDto } from "./dto/crear-relacion-ruta-parametro.dto";
import { ActualizarRelacionRutaParametroDto } from "./dto/actualizar-relacion-ruta-parametro.dto";
import { Auth } from "../../decorators/auth.decorator";

@ApiTags("Permiso - rutas")
@Controller('permiso_ruta')
@Auth()
export class PermisoRutaController {
    constructor(private readonly permisoRutaService: PermisoRutaService) {}

    @ApiResponse({ status: 201, description: 'Ruta creada correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post()
    crearRegistro(@Body() crearPermisoRutaDto: CrearPermisoRutaDto) {
        return this.permisoRutaService.crearRegistro(crearPermisoRutaDto);
    }

    @ApiResponse({ status: 201, description: 'Relacion creada correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post('/relacion')
    crearRelacionRutaParametro(@Body() crearRelacionRutaParametroDto: CrearRelacionRutaParametroDto) {
        return this.permisoRutaService.crearRelacionRutaParametro(crearRelacionRutaParametroDto);
    }


    @ApiResponse({ status: 201, description: 'Relaciones encontrados correctamente.', type: PermisoParametroRutaEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: Rutas no encontradas.' })
    @Get('/relacion')
    obtenerTodosLasRelaciones()  {
        return this.permisoRutaService.obtenerTodasLasRelacionesRutaParametro();
    }

    @ApiResponse({ status: 201, description: 'Rutas encontradas correctamente.', type: PermisoRutaEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: Rutas no encontradas.' })
    @Get()
    obtenerTodosLosRegistros()  {
        return this.permisoRutaService.obtenerTodosLosRegistros();
    }

    @ApiResponse({ status: 201, description: 'Rutas encontrdas correctamente.', type: PermisoParametroEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron Rutas.' })
    @Get('/paginado')
    @UseInterceptors(PaginacionInterceptor)
    @ApiQuery({name: 'pagina', required: true, type: Number})
    @ApiQuery({name: 'limite', required: false, type: Number})
    @ApiQuery({name: 'busqueda', required: false, type: String})
    @ApiQuery({name: 'campo', required: false, type: String})
    obtenerRegistrosPaginados(@Query() parametrosConsulta) {
        const {limite, pagina, busqueda, campo} = parametrosConsulta;
        return this.permisoRutaService.obtenerRegistrosPaginados(limite, pagina, busqueda, campo);
    }

    @ApiResponse({ status: 201, description: 'Metodos HTTP encontrados correctamente.', type: ValorParametroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: Metodos HTTP no encontrados.' })
    @Get('/metodos_http')
    obtenerMetodosHttp() {
        return this.permisoRutaService.obtenerMetodosHttp();
    }

    @ApiResponse({ status: 201, description: 'Ruta encontrada correctamente.', type: PermisoRutaEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: Permiso de ruta no existe.' })
    @Get(':uuid')
    obtenerUnRegistro(@Param('uuid', ParseUUIDPipe) uuid) {
        return this.permisoRutaService.obtenerUnRegistro(uuid)
    }

    @ApiResponse({ status: 201, description: 'La relación fue encontrada correctamente.', type: PermisoParametroRutaEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: La relación no existe.' })
    @Get('/relacion/:uuid')
    obtenerRelacionRutaParametro(@Param('uuid', ParseUUIDPipe) uuid) {
        return this.permisoRutaService.obtenerRelacionRutaParametro(uuid)
    }


    @ApiResponse({ status: 201, description: 'Ruta actualizada correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: La Ruta no existe.' })
    @Patch(':uuid')
    actualizarRegistro(@Param('uuid', ParseUUIDPipe) uuid, @Body() actualizarPermisoRutaDto: ActualizarPermisoRutaDto) {
        return this.permisoRutaService.actualizarRegistro(uuid, actualizarPermisoRutaDto);
    }

    @ApiResponse({ status: 201, description: 'Relación actualizada correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: La Ruta no existe.' })
    @Patch('/relacion/:uuid')
    actualizarRelacionRutaParametro(@Param('uuid', ParseUUIDPipe) uuid, @Body() actualizarRelacionRutaParametroDto: ActualizarRelacionRutaParametroDto) {
        return this.permisoRutaService.actualizarRelacionRutaParametro(uuid, actualizarRelacionRutaParametroDto);
    }

    @ApiResponse({ status: 201, description: 'Registro eliminado correctamente.', type: LibroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El registro no existe.' })
    @Patch('/delete/:uuid')
    eliminarRegistro(@Param('uuid', ParseUUIDPipe) uuid) {
        return this.permisoRutaService.eliminarRegistro(uuid);
    }

    @ApiResponse({ status: 201, description: 'Registro eliminado correctamente.', type: LibroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El registro no existe.' })
    @Patch('/delete/relacion/:uuid')
    eliminarRelacion(@Param('uuid', ParseUUIDPipe) uuid) {
        return this.permisoRutaService.eliminarRelacionRutaParametro(uuid);
    }
}
