import {Injectable} from "@nestjs/common";
import * as abstract from "./core/abstract";
import {FileImageRepository} from "./repositories";
import {S3Config} from "../storage/s3/s3.config";

@Injectable()
export class FileService implements abstract.IFileRepositoryAbstract{
    public images: abstract.IImageRepository;
    
    
    public async onApplicationBootstrap(){
        this.images = new FileImageRepository(new S3Config());
        //this.images = new FileImageRepository(new LocalFileConfig());
    }
    
}
