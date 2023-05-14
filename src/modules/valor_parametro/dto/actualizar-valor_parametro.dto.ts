import { PartialType } from '@nestjs/swagger';
import { CrearValorParametroDto } from './crear-valor_parametro.dto';

export class ActualizarValorParametroDto extends PartialType(CrearValorParametroDto) {}
