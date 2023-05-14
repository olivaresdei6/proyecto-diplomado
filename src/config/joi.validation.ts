import * as Joi from "joi";

/**
 * Un validation Schema es un objeto que define la estructura de un objeto que
 * se va a validar. En este caso, se define la estructura de un objeto que se
 * va a utilizar para configurar la aplicación. El objeto de configuración de la
 * aplicación se define en el archivo .env. Para ello se utiliza la librería Joi.
 * Esta librería con más de 11 millones de descargas en npm, es una de las
 * librerías más populares para la validación de datos en NodeJS y además se
 * caracteriza por ser muy sencilla de usar.
 */

export const JoiValidationSchema = Joi.object({
	DATABASE_NAME: Joi.string().required(),
	DATABASE_USER: Joi.string().required(),
	DATABASE_PASSWORD: Joi.string().required(),
	DATABASE_PORT: Joi.number().default(3306),
	DATABASE_HOST: Joi.string().required(),
	PORT: Joi.number().default(80),
	JWT_SECRET: Joi.string().required(),
	STAGE: Joi.string().valid("dev", "prod").required(),
	URL_API: Joi.string().required(),
	EMAIL_HOST: Joi.string().required(),
	EMAIL_PORT: Joi.number().default(587),
	EMAIL_USER: Joi.string().required(),
	EMAIL_PASSWORD: Joi.string().required(),
	EMAIL_FROM: Joi.string().required(),
	URL_FRONT: Joi.string().required(),
	URL_CONFIRMATION: Joi.string().required(),
	S3_BUCKET_NAME: Joi.string().required(),
	S3_REGION: Joi.string().required(),
	S3_ACCESS_KEY_ID: Joi.string().required(),
	S3_SECRET_ACCESS_KEY: Joi.string().required(),
	HOST_URL: Joi.string().required(),

});
