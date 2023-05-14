import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {INestApplication} from '@nestjs/common';
import {envConfiguration} from "../env.config";

export class SwaggerConfig {
	static ConfigSwaggerModule(app: INestApplication): void {
		const config = new DocumentBuilder()
			.setTitle("Proyecto Finsl del Diplomado en Tecnologias Para La Industria 4.0")
			.setDescription("API RESTFull dedicada a la gestion de libros de una biblioteca")
			.setVersion("v1.0.0")
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup(`api`, app, document, {
			swaggerOptions: {
				filter: true,
				showRequestDuration: true,
			},
		});
	};
}
