import {
    Body,
    Controller,
    Get,
    Param, ParseIntPipe,
    ParseUUIDPipe,
    Patch,
    Post,
    Query, UseInterceptors
} from "@nestjs/common";
import {ParametroService} from './parametro.service';
import {CrearParametroDto} from './dto/crear-parametro.dto';
import {ActualizarParametroDto} from './dto/actualizar-parametro.dto';
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ParametroEntity } from "../../frameworks/database/mysql/entities";
import { PaginacionInterceptor } from "../../config/iterceptors/paginacion.interceptor";
import { Auth } from "../../decorators/auth.decorator";

@ApiTags("Parametro")
@Controller('parametro')
export class ParametroController {
    constructor(private readonly parametroService: ParametroService) {}

    @ApiResponse({ status: 201, description: 'Parámetro creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Auth()
    @Post()
    creaarRegistro(@Body() crearParametroDto: CrearParametroDto){
        return this.parametroService.crearRegistro(crearParametroDto);
    }
    

    @ApiResponse({ status: 201, description: 'Parámetros encontrados correctamente.', type: ParametroEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron parámetros.' })
    @Get()
    obtenerTodosLosRegistros(): Promise<ParametroEntity[]>  {
        return this.parametroService.obtenerTodosLosRegistros();
    }


    @ApiResponse({ status: 201, description: 'Parámetros encontrados correctamente.', type: ParametroEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron parámetros.' })
    @Auth()
    @Get('paginado')
    @UseInterceptors(PaginacionInterceptor)
    @ApiQuery({name: 'pagina', required: true, type: Number})
    @ApiQuery({name: 'limite', required: false, type: Number})
    @ApiQuery({name: 'busqueda', required: false, type: String})
    @ApiQuery({name: 'campo', required: false, type: String})
    obtenerRegistrosPaginados(@Query() parametrosConsulta) {
        const {limite, pagina, busqueda, campo} = parametrosConsulta;
        return this.parametroService.obtenerRegistrosPaginados(limite, pagina, busqueda, campo);
    }
    
    
    
    @ApiResponse({ status: 201, description: 'Parámetro encontrado correctamente.', type: ParametroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Get(':uuid')
    obtenerUnRegistro(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<ParametroEntity> {
        return this.parametroService.obtenerUnRegistro(uuid);
    }
    
    
    
    @ApiResponse({ status: 201, description: 'Parámetro actualizado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El parámetro no existe.' })
    @Auth()
    @Patch(':uuid')
    actualizarRegistro(@Param('uuid', ParseUUIDPipe) uuid:string, @Body() actualizarParametroDto: ActualizarParametroDto) {
        return this.parametroService.actualizarRegistro(uuid, actualizarParametroDto);
    }
    
    
}
