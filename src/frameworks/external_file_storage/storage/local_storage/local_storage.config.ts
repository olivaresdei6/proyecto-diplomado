import * as fs from "fs";
import {existsSync} from "fs";
import {ExceptionsService} from "../../../../config/exceptions/exceptions.service";
import * as process from "process";
import * as path from "path"

export class LocalFileConfig {
    private exceptions: ExceptionsService;
    
    constructor() {
        this.exceptions = new ExceptionsService();
    }
    
    /**
     * Permite cargar un archivo en el servidor
     * @param file - Archivo a cargar. Debe ser un archivo de tipo Express.Multer.File.
     * @param key - Nombre del archivo. Debe ser un string.
     */
    async uploadFile(file: Express.Multer.File, key:string) {
        const filePath = `${process.cwd()}/public/images/${key}`;
        try {
            /**
             * Guardamos el archivo en el servidor
             */
            fs.writeFileSync(filePath, file.buffer);
            return this.getFileUrl(key);
        } catch (e) {
            this.exceptions.internalServerErrorException({message: 'Error al subir el archivo'});
        }
    }
    
    /**
     * Permite obtener la url de un archivo
     * @param fileUrl - Url del archivo
     * @param buffer - Buffer del archivo a cargar
     * @param key - Nombre del archivo
     */
    async resizeFile(fileUrl: string, buffer: Buffer, key:string) {
        if (!await this.existsFile(fileUrl)) this.exceptions.notFoundException({message: 'File not found'});
        const filePath = `public/image/${key}`;
        try {
            fs.writeFileSync(filePath, buffer);
            return this.getFileUrl(key);
        } catch (e) {
            this.exceptions.internalServerErrorException({message: 'Error al subir el archivo'});
        }
    }
    
    /**
     * Permite verificar si un archivo existe
     * @param fileUrl - Url del archivo
     */
    async existsFile(fileUrl: string): Promise<boolean> {
        const filePath = `public/image/${fileUrl.split('/').pop()}`;
        try {
            /**
             * Verificamos si el archivo existe.
             * fs.constants.F_OK - Verifica si el archivo existe
             * accessSync - Permite verificar si un archivo existe
             */
            fs.accessSync(filePath, fs.constants.F_OK);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    /**
     * Permite eliminar un archivo
     * @param fileUrl - Url del archivo
     */
    async deleteFile(fileUrl: string): Promise<void> {
        const filePath = `public/image/${fileUrl.split('/').pop()}`;
        try {
            fs.unlinkSync(filePath);
        } catch (e) {
            this.exceptions.internalServerErrorException({message: 'Error al eliminar el archivo'});
        }
    }
    
    /**
     * Permite descargar un archivo
     * @param fileKey - Nombre del archivo
     */
    async downloadImage(fileKey: string){
        const filePath = `public/image/${fileKey}`;
        try {
            /**
             * Leemos el archivo y lo retornamos
             */
            return fs.readFileSync(filePath);
        } catch (e) {
            this.exceptions.notFoundException({message: 'File not found'});
        }
    }
    
    /**
     * Permite obtener la url de un archivo
     * @param fileKey - Nombre del archivo
     */
    async getFileUrl(fileKey: string): Promise<string> {
        const filePath = path.resolve(`${process.cwd()}\\public\\images\\${fileKey}`).replace(/\\|\//g, path.sep);
        if (!existsSync(filePath)){
            this.exceptions.notFoundException({message: "Imagen no encontrada"})
        }
        return filePath;
    }
}
