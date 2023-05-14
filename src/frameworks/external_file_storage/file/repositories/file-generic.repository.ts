import {v4 as uuidv4} from 'uuid';
import {IGenericRepository} from '../core/abstract';
import {ExceptionsService} from "../../../../config/exceptions/exceptions.service";
import {S3Config} from "../../storage/s3/s3.config";
import {LocalFileConfig} from "../../storage/local_storage/local_storage.config";
import {imageSize} from "image-size";
import {ImagenEntity} from "../../../database/mysql/entities";

export class FileGenericRepository extends IGenericRepository{
    protected readonly bucketName: string;
    
    protected exceptions: ExceptionsService;
    
    constructor(private readonly serviceImage: S3Config | LocalFileConfig) {
        super();
    }
    
    async uploadFile(file: Express.Multer.File): Promise<ImagenEntity> {
        const uuid = uuidv4();
        const ext = file.originalname.split('.').pop();
        const fileKey = `${uuid}.${ext}`;
        const urlFileSaved = await this.serviceImage.uploadFile(file, fileKey);
        console.log(urlFileSaved)
        const metadata = imageSize(file.buffer);
        const { width, height } = metadata;
        console.log(width, height)
    
        return {
            url: urlFileSaved,
            nombreOriginal: file.originalname,
            tipoDeImagen: ext,
            nombreGuardado: fileKey,
            size: file.size,
            ancho: width,
            altura: height,
            uuid: uuid
        };
    }
    
    async resizeFile(urlFile:string, buffer:Buffer, width: number, height: number): Promise<string> {
        const fileKey = `${uuidv4()}-${width}x${height}`;
        await this.serviceImage.resizeFile(urlFile,buffer, fileKey);
        return fileKey;
    }
    
    async deleteFile(fileKey: string): Promise<void> {
        await this.serviceImage.deleteFile(fileKey);
    }
    
    async getFileUrl(fileKey: string): Promise<string> {
        const urlImage = await this.serviceImage.getFileUrl(fileKey);
        if (!urlImage) this.exceptions.notFoundException({message: 'File not found'});
        return urlImage;
    }
    
    async getDownloadFile(fileKey: string): Promise<Buffer> {
        const file = await this.serviceImage.downloadImage(fileKey);
        if (!file) this.exceptions.notFoundException({message: 'File not found'});
        return file;
    }
}
