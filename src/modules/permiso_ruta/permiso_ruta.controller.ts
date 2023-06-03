import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
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
    @Get(':id')
    obtenerUnRegistro(@Param('id', ParseIntPipe) id:number) {
        return this.permisoRutaService.obtenerUnRegistro(id)
    }

    @ApiResponse({ status: 201, description: 'La relación fue encontrada correctamente.', type: PermisoParametroRutaEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: La relación no existe.' })
    @Get('/relacion/:id')
    obtenerRelacionRutaParametro(@Param('id', ParseIntPipe) id:number) {
        return this.permisoRutaService.obtenerRelacionRutaParametro(id)
    }


    @ApiResponse({ status: 201, description: 'Ruta actualizada correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: La Ruta no existe.' })
    @Patch(':id')
    actualizarRegistro(@Param('id', ParseIntPipe) id:number, @Body() actualizarPermisoRutaDto: ActualizarPermisoRutaDto) {
        return this.permisoRutaService.actualizarRegistro(id, actualizarPermisoRutaDto);
    }

    @ApiResponse({ status: 201, description: 'Relación actualizada correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: La Ruta no existe.' })
    @Patch('/relacion/:id')
    actualizarRelacionRutaParametro(@Param('id', ParseIntPipe) id:number, @Body() actualizarRelacionRutaParametroDto: ActualizarRelacionRutaParametroDto) {
        return this.permisoRutaService.actualizarRelacionRutaParametro(id, actualizarRelacionRutaParametroDto);
    }

    @ApiResponse({ status: 201, description: 'Registro eliminado correctamente.', type: LibroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El registro no existe.' })
    @Patch('/delete/:id')
    eliminarRegistro(@Param('id', ParseIntPipe) id) {
        return this.permisoRutaService.eliminarRegistro(id);
    }

    @ApiResponse({ status: 201, description: 'Registro eliminado correctamente.', type: LibroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El registro no existe.' })
    @Patch('/delete/relacion/:id')
    eliminarRelacion(@Param('id', ParseIntPipe) id) {
        return this.permisoRutaService.eliminarRelacionRutaParametro(id);
    }
}
