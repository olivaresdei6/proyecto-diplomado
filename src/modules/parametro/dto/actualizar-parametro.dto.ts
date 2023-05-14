import { PartialType } from '@nestjs/swagger';
import { CrearParametroDto } from './crear-parametro.dto';

export class ActualizarParametroDto extends PartialType(CrearParametroDto) {}
