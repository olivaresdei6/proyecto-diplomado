import {Injectable} from '@nestjs/common';
import sharp from 'sharp';
import {IImageRepository} from "../core/abstract";
import {FileGenericRepository} from "./file-generic.repository";


@Injectable()
export class FileImageRepository extends FileGenericRepository implements IImageRepository {
    async resizeImage(fileUrl: string, width: number, height: number): Promise<string> {
        const fileKey = this.getFileKeyFromUrl(fileUrl);
        if (!fileKey) this.exceptions.notFoundException({message: 'File URL is invalid'});
        const resizedImage: Buffer = await sharp(fileUrl).resize(width, height).toBuffer();
        return await this.resizeFile(fileUrl, resizedImage, width, height);
    }
    
    async getImageMetadata(fileUrl: string): Promise<{ width: number; height: number }> {
        const fileKey = this.getFileKeyFromUrl(fileUrl);
        if (!fileKey) this.exceptions.notFoundException({message: 'File URL is invalid'});
        const metadata = await sharp(fileUrl).metadata();
        return { width: metadata.width, height: metadata.height };
    }
    
    private getFileKeyFromUrl(fileUrl: string): string {
        const fileKey = fileUrl.split('/').pop();
        if (!fileKey) {
            throw new Error('File URL is invalid');
        }
        return fileKey;
    }
}
