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
import { LibroEntity } from "../../frameworks/database/mysql/entities";
import { PaginacionInterceptor } from "../../config/iterceptors/paginacion.interceptor";
import { Auth } from "../../decorators/auth.decorator";
import { LibroService } from "./libro.service";
import { CrearLibroDto } from "./dto/crear-libro.dto";
import { ActualizarLibroDto } from "./dto/actualizar-libro.dto";

@ApiTags("Libros")
@Controller('libro')
export class LibroController {
    constructor(private readonly libroService: LibroService) {}

    @Auth()
    @Get('/prueba_1')
    prueba_1() {
        return 'Hola mundo';
    }

    @ApiResponse({ status: 201, description: 'Libro creado correctamente.'})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })

    @Post()
    crearRegistro(@Body() crearLibroDto: CrearLibroDto) {
        return this.libroService.crearRegistro(crearLibroDto);
    }


    @ApiResponse({ status: 201, description: 'Libros encontrados correctamente.', type: LibroEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron libros.' })

    @Get()
    obtenerTodosLosRegistros(): Promise<LibroEntity[]>  {
        return this.libroService.obtenerTodosLosRegistros();
    }

    @ApiResponse({ status: 201, description: 'Libros encontrados correctamentee.', type: LibroEntity, isArray: true})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: No se encontraron libros.' })
    @Get('/paginado')
    @UseInterceptors(PaginacionInterceptor)
    @ApiQuery({name: 'pagina', required: true, type: Number})
    @ApiQuery({name: 'limite', required: false, type: Number})
    @ApiQuery({name: 'busqueda', required: false, type: String})
    @ApiQuery({name: 'campo', required: false, type: String})
    obtenerRegistrosPaginados(@Query() parametrosConsulta) {
        const {limite, pagina, busqueda, campo} = parametrosConsulta;
        return this.libroService.obtenerRegistrosPaginados(limite, pagina, busqueda, campo);
    }


    @ApiResponse({ status: 201, description: 'Libro encontrado correctamente.', type: LibroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El libro no existe.' })

    @Get(':uuid')
    obtenerUnRegistro(@Param('uuid', ParseUUIDPipe) uuid:string): Promise<LibroEntity>  {
        return this.libroService.obtenerUnRegistro(uuid);
    }

    @ApiResponse({ status: 201, description: 'Registro eliminado correctamente.', type: LibroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El registro no existe.' })
    @Patch('/delete/:uuid')
    eliminarRegistro(@Param('uuid', ParseUUIDPipe) uuid) {
        return this.libroService.eliminarRegistro(uuid);
    }

    @ApiResponse({ status: 201, description: 'Libro actualizado correctamente.', type: LibroEntity})
    @ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
    @ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
    @ApiResponse({ status: 403, description: 'Forbidden: Verifique que el token de autenticación sea válido y que no halla expirado.' })
    @ApiResponse({ status: 404, description: 'Not Found: El libro no existe.' })
    @Patch(':uuid')
    actualizarRegistro(@Param('uuid', ParseUUIDPipe) uuid, @Body() actualizarLibroDto: ActualizarLibroDto) {
        return this.libroService.actualizarRegistro(uuid, actualizarLibroDto);
    }
}
