import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as entities from './entities';
import {envConfiguration} from "../../../config/env.config";
import { IConexionDb } from "./core/abstract";
import { MySQLBaseDeDatosService } from "./mysql.service";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule.forRoot({})],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					type: 'mysql',
					host: envConfiguration().databaseHost,
					port: envConfiguration().databasePort,
					username: envConfiguration().databaseUser,
					password: envConfiguration().databasePassword,
					database: envConfiguration().databaseName,
					synchronize: true,
					// Cambiar la zona horaria a la de Colombia
					timezone: "-05:00",
					/* Logging sirve para ver las consultas que se hacen a la base de datos */
					//logging: true,
					/* autoLoadEntities sirve para que no sea necesario importar las entidades en el archivo app.module.ts */
					autoLoadEntities: true,
					entities: Object.values(entities),
					cli: {
						entitiesDir: 'src/frameworks/database/mysql/entities',
					},
				};
			},
		}),
		TypeOrmModule.forFeature(Object.values(entities)),
	],
	providers: [
		{
			provide: IConexionDb,
			useClass: MySQLBaseDeDatosService,
		}
	],
	exports: [IConexionDb]
})
export class MySQLDatabaseModule {}
