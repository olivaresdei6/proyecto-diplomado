import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput,
    S3Client
} from "@aws-sdk/client-s3";
import {envConfiguration} from "../../../../config/env.config";
import {ExceptionsService} from "../../../../config/exceptions/exceptions.service";
import {S3FileUrl} from "aws-sdk/clients/iot";

export class S3Config {
    private readonly s3: S3Client;
    
    private exceptions: ExceptionsService;
    
    constructor() {
        this.exceptions = new ExceptionsService();
        try {
            this.s3 =  new S3Client(
                {
                    region: envConfiguration().s3Region,
                    credentials: {
                        accessKeyId: envConfiguration().s3AccessKey,
                        secretAccessKey: envConfiguration().s3SecretKey,
                    }
                }
            );
        }catch (e) {
            this.exceptions.notFoundException({message: 'Error al conectar con el servidor S3'});
        }
    }
    
    async uploadFile(file: Express.Multer.File, key:string) {
        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: envConfiguration().s3BucketName,
            Key: key,
            ContentType: file.mimetype,
            ACL: 'public-read',
        }
        try {
            const response: PutObjectCommandOutput = await this.s3.send(new PutObjectCommand(input));
            if (response.$metadata.httpStatusCode === 200) {
                return this.getFileUrl(key);
            }
        }catch (e) {
            this.exceptions.internalServerErrorException({message: 'Error al subir el archivo'});
        }
    }
    
    
    async resizeFile(fileUrl: S3FileUrl, buffer: Buffer, key:string) {
        const image = this.downloadImage(fileUrl);
        if (!image) this.exceptions.notFoundException({message: 'File not found'});
        const input: PutObjectCommandInput = {
            Body: buffer,
            Bucket: envConfiguration().s3BucketName,
            Key: key,
            ContentType: 'image/jpeg',
            ACL: 'public-read',
        }
        try {
            const response: PutObjectCommandOutput = await this.s3.send(new PutObjectCommand(input));
            if (response.$metadata.httpStatusCode === 200) {
                return this.getFileUrl(key);
            }
        }catch (e) {
            this.exceptions.internalServerErrorException({message: 'Error al subir el archivo'});
        }
    }
    
    async deleteFile(fileUrl: string): Promise<void> {
        try {
            const fileKey = fileUrl.split('/').pop();
            await this.s3.send(new DeleteObjectCommand({Bucket: envConfiguration().s3BucketName, Key: fileKey}));
        }catch (e) {
            this.exceptions.internalServerErrorException({message: 'Error al eliminar el archivo'});
        }
    }
    
    
    
    public async downloadImage(fileKey: string){
        try {
            const params = {
                Bucket: envConfiguration().s3BucketName,
                Key: fileKey,
            };
            // GetObjectCommand es un comando de S3Client que permite obtener un objeto de S3
            const image =  await this.s3.send(new GetObjectCommand(params));
            // Se convierte la imagen a un buffer
            const imageBuffer: ReadableStream = image.Body.transformToWebStream();
            // ReadableStream es un tipo de dato que se puede convertir a un buffer
            return await this.streamToBuffer(imageBuffer);
        }catch (e) {
            this.exceptions.internalServerErrorException({message: 'Error al descargar el archivo'});
        }
    }
    
    private async streamToBuffer(stream: ReadableStream): Promise<Buffer> {
        try {
            const chunks: Uint8Array[] = [];
            const reader = stream.getReader();
            let result = await reader.read();
            while (!result.done) {
                chunks.push(result.value);
                result = await reader.read();
            }
            return Buffer.concat(chunks);
        }catch (e) {
            this.exceptions.badRequestException({message: 'Error al convertir el archivo a buffer'});
        }
    }
    
    async getFileUrl(fileKey: string): Promise<string> {
        try {
            const params = {
                Bucket: envConfiguration().s3BucketName,
                Key: fileKey,
            };
            // Comprobamos si el archivo existe
            const file = await this.s3.send(new GetObjectCommand(params));
            if (!file) this.exceptions.notFoundException({message: 'File not found'});
            return `https://${envConfiguration().s3BucketName}.s3.${envConfiguration().s3Region}.amazonaws.com/${fileKey}`;
        }catch (e) {
            this.exceptions.notFoundException({message: 'Archivo no encontrado'});
        }
    }
}
