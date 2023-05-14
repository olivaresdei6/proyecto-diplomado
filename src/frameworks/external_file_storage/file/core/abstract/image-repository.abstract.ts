import {IGenericRepository} from './generic-repository.abstract';

export abstract class IImageRepository extends IGenericRepository {
    public abstract resizeImage(fileUrl: string, width: number, height: number): Promise<string>;
    public abstract getImageMetadata(fileUrl: string): Promise<{ width: number; height: number }>;
}
