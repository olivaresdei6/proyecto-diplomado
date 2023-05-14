import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query, UseInterceptors
} from "@nestjs/common";
import {PermisoService} from './permiso.service';
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LibroEntity, PermisoEntity } from "../../frameworks/database/mysql/entities";
import { PaginacionInterceptor } from "../../config/iterceptors/paginacion.interceptor";
import { CrearPermisoDto } from "./dto/crear-permiso.dto";
import { ActualizarPermisoDto } from "./dto/actualizar-permiso.dto";
import { Auth } from "../../decorators/auth.decorator";

@ApiTags("Permiso")
@Controller('permiso')
@Auth()
export class PermisoController {
    constructor(private readonly permisoService: PermisoService) {}
    
    @ApiResponse({ status: 201, description: 'Permiso creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Post()
    creaarRegistro(@Body() crearPermisoDto: CrearPermisoDto){
        return this.permisoService.crearRegistro(crearPermisoDto);
    }
    
    
    
    @ApiResponse({ status: 201, description: 'Permisos encontrados correctamente.', type: PermisoEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron permisos.' })
    @Get()
    obtenerTodosLosRegistros(): Promise<PermisoEntity[]>  {
        return this.permisoService.obtenerTodosLosRegistros();
    }
    
    @ApiResponse({ status: 201, description: 'Permiso encontrado correctamente.', type: PermisoEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Permiso no existe.' })
    @Get(':uuid')
    obtenerUnRegistro(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<PermisoEntity> {
        return this.permisoService.obtenerUnRegistro(uuid);
    }


    @ApiResponse({ status: 201, description: 'Registro eliminado correctamente.', type: LibroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El registro no existe.' })
    @Patch('/delete/:uuid')
    eliminarRegistro(@Param('uuid', ParseUUIDPipe) uuid) {
        return this.permisoService.eliminarRegistro(uuid);
    }



    @ApiResponse({ status: 201, description: 'Permiso actualizado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Permiso no existe.' })
    @Patch(':uuid')
    actualizarRegistro(@Param('uuid', ParseUUIDPipe) uuid:string, @Body() actualizarPermisoDto: ActualizarPermisoDto) {
        return this.permisoService.actualizarRegistro(uuid, actualizarPermisoDto);
    }
}
