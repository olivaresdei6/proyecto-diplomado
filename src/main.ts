/**
 * NestFactory es una clase que permite crear una instancia de la aplicación
 **/
import {NestFactory} from "@nestjs/core";
/**
 * AppModule es la clase que contiene la configuración de la aplicación NestJS.
 */
import {AppModule} from "./app.module";
/**
 * Validation Pipe es una librería que permite validar los datos de entrada
 * de las rutas.
 */
import {Logger, ValidationPipe} from "@nestjs/common";
import {LoggerService} from "./config/logger/logger.service";
import {ConfigService} from "@nestjs/config";
import {AllExceptionFilter} from "./config/filters";
import {SwaggerConfig} from "./config/swagger/swagger";
import {envConfiguration} from "./config/env.config";
import { LoggingInterceptor } from './config/iterceptors/loggers.interceptor';
import { ResponseInterceptor } from './config/iterceptors/response.interceptor';
import { TimeoutInterceptor } from './config/iterceptors/timeout.interceptor';

async function main() {
  const logger = new LoggerService();
  const configService = new ConfigService();
  /**
   * Creando una instancia de la aplicación NestJS
   */
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  app.useGlobalFilters(new AllExceptionFilter(logger));

  app.enableCors();

  /**
   * Configuración de la validación de datos de entrada.
   */
  app.useGlobalPipes(
    new ValidationPipe({
        /**
         * whitelist es una propiedad que indica si se deben ignorar los
         * datos
         */
        whitelist: true,
        /**
         * forbidNonWhitelisted es una propiedad que indica si se debe
         * lanzar una excepción cuando se reciban datos de entrada que no
         * estén definidos en la clase DTO.
         */
        forbidNonWhitelisted: true,
        /**
         * transform es una propiedad que indica si se deben transformar
         * los datos de entrada a los tipos definidos en la clase DTO.
         */
        transform: true,
        /**
         * transformOptions es una propiedad que permite configurar la
         * transformación de datos de entrada.
         */
        transformOptions: {
          /**
           * enableImplicitConversion es una propiedad que indica si se
           * deben transformar los datos de entrada a los tipos definidos
           * en la clase DTO.
           */
          enableImplicitConversion: true
        }
      }
    )
  );

  /**
   * Configuración del prefijo global para todas las rutas.
   */
  app.setGlobalPrefix("api/v1");

  /**
   * Exponiendo el documento de Swagger en la ruta /api.
   */
  SwaggerConfig.ConfigSwaggerModule(app);
  await app.listen(envConfiguration().portServer, "0.0.0.0");
}

main().then(() => {
  const logger = new Logger("Main");
  logger.log(`Server running success in on port ${envConfiguration().portServer}`);
});
