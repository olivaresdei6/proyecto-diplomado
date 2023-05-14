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
import { LibroEntity, PermisoModuloEntity } from "../../frameworks/database/mysql/entities";
import { PaginacionInterceptor } from "../../config/iterceptors/paginacion.interceptor";
import { PermisoModuloService } from "./permiso_modulo.service";
import { ActualizarPermisoModuloDto } from "./dto/actualizar-permiso-modulo.dto";
import { CrearPermisoModuloDto } from "./dto/crear-permiso-modulo.dto";
import { Auth } from "../../decorators/auth.decorator";

@ApiTags("Modulos de permisos")
@Controller('permiso_modulo')
@Auth()
export class PermisoModuloController {
    constructor(private readonly permisoModuloService: PermisoModuloService) {}

    @ApiResponse({ status: 201, description: 'Modulo De Permiso creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })

    @Post()
    crearRegistro(@Body() crearPermisoModuloDto: CrearPermisoModuloDto) {
        return this.permisoModuloService.crearRegistro(crearPermisoModuloDto);
    }


    @ApiResponse({ status: 201, description: 'Modulos de permisos encontrados correctamente.', type: PermisoModuloEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El modulo de permiso no existe.' })

    @Get()
    obtenerTodosLosRegistros(): Promise<PermisoModuloEntity[]>  {
        return this.permisoModuloService.obtenerTodosLosRegistros();
    }

    @ApiResponse({ status: 201, description: 'Modulos de permisos encontrados correctamente.', type: PermisoModuloEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron modulos de permisos.' })

    @Get('/paginado')
    @UseInterceptors(PaginacionInterceptor)
    @ApiQuery({name: 'pagina', required: true, type: Number})
    @ApiQuery({name: 'limite', required: false, type: Number})
    @ApiQuery({name: 'busqueda', required: false, type: String})
    @ApiQuery({name: 'campo', required: false, type: String})
    obtenerRegistrosPaginados(@Query() parametrosConsulta) {
        const {limite, pagina, busqueda, campo} = parametrosConsulta;
        return this.permisoModuloService.obtenerRegistrosPaginados(limite, pagina, busqueda, campo);
    }


    @ApiResponse({ status: 201, description: 'Modulo de permiso encontrados correctamente.', type: PermisoModuloEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El modulo de permiso no existe.' })

    @Get(':uuid')
    obtenerUnRegistro(@Param('uuid', ParseUUIDPipe) uuid:string): Promise<PermisoModuloEntity>  {
        console.log(uuid);
        return this.permisoModuloService.obtenerUnRegistro(uuid)
    }

    @ApiResponse({ status: 201, description: 'Registro eliminado correctamente.', type: LibroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El registro no existe.' })
    @Patch('/delete/:uuid')
    eliminarRegistro(@Param('uuid', ParseUUIDPipe) uuid) {
        return this.permisoModuloService.eliminarRegistro(uuid);
    }

    @ApiResponse({ status: 201, description: 'Modulo de permiso actualizado correctamente.', type: PermisoModuloEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El modulo de permiso no existe.' })
    @Patch(':uuid')
    actualizarRegistro(@Param('uuid', ParseUUIDPipe) uuid, @Body() actualizarPermisoModuloDto: ActualizarPermisoModuloDto) {
        return this.permisoModuloService.actualizarRegistro(uuid, actualizarPermisoModuloDto);
    }
}
