import {ImagenEntity} from "../../../../database/mysql/entities";

export abstract class IGenericRepository {
    public abstract uploadFile(file: Express.Multer.File): Promise<ImagenEntity>;
    public abstract deleteFile(fileUrl: string): Promise<void>;
    public abstract getFileUrl(fileKey: string): Promise<string>;
    public abstract resizeFile(urlFile:string, buffer:Buffer, width: number, height: number): Promise<string>;
    public abstract getDownloadFile(fileKey: string): Promise<Buffer>;
    
}
