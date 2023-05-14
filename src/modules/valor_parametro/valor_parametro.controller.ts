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
import { ValorParametroService } from "./valor_parametro.service";
import { ParametroEntity, ValorParametroEntity } from "../../frameworks/database/mysql/entities";
import { CrearValorParametroDto } from "./dto/crear-valor_parametro.dto";
import { ActualizarValorParametroDto } from "./dto/actualizar-valor_parametro.dto";
import { PaginacionInterceptor } from "../../config/iterceptors/paginacion.interceptor";
import { Auth } from "../../decorators/auth.decorator";

@ApiTags("Valores Parámetros")
@Controller('valor_parametro')
export class ValorParametroController {
    constructor(private readonly valorParametroService: ValorParametroService) {}
    @ApiResponse({ status: 201, description: 'Valor Parámetro creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @Auth()
    @Post()
    crearRegistro(@Body() crearValorParametroDto: CrearValorParametroDto) {
        return this.valorParametroService.crearRegistro(crearValorParametroDto);
    }


    @ApiResponse({ status: 201, description: 'Valores Parámetros encontrados correctamente.', type: ValorParametroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Valor parámetro no existe.' })
    @Get('parametro/:uuid')
    obtenerTodosLosRegistros(@Param('uuid') uuid:string ): Promise<ValorParametroEntity[]>  {
        return this.valorParametroService.obtenerTodosLosRegistros(uuid);
    }

    @ApiResponse({ status: 201, description: 'Valores Parámetros encontrados correctamente.', type: ParametroEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron parámetros.' })
    @Auth()
    @Get('/paginado')
    @UseInterceptors(PaginacionInterceptor)
    @ApiQuery({name: 'pagina', required: true, type: Number})
    @ApiQuery({name: 'limite', required: false, type: Number})
    @ApiQuery({name: 'busqueda', required: false, type: String})
    @ApiQuery({name: 'campo', required: false, type: String})
    obtenerRegistrosPaginados(@Query() parametrosConsulta) {
        const {limite, pagina, busqueda, campo} = parametrosConsulta;
        return this.valorParametroService.obtenerRegistrosPaginados(limite, pagina, busqueda, campo);
    }


    @ApiResponse({ status: 201, description: 'Valore Parámetro encontrado correctamente.', type: ValorParametroEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El Valor parámetro no existe.' })
    @Auth()
    @Get(':uuid')
    obtenerUnRegistro(@Param('uuid', ParseUUIDPipe) uuid): Promise<ValorParametroEntity>  {
        return this.valorParametroService.obtenerUnRegistro(uuid)
    }



    @ApiResponse({ status: 201, description: 'Valor Parámetro actualizado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El valor parámetro no existe.' })
    @Auth()
    @Patch(':uuid')
    actualizarRegistro(@Param('uuid', ParseUUIDPipe) uuid, @Body() actualizarValorParametroDto: ActualizarValorParametroDto) {
        return this.valorParametroService.actualizarRegistro(uuid, actualizarValorParametroDto);
    }
}
