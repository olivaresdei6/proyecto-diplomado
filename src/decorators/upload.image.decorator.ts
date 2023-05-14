import {applyDecorators, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import { fileFilter } from "../helpers/imageFileFilter";

export const ValidateImageUploaded = (fieldName?: string) => {
    return applyDecorators(
        UseInterceptors(
            FileInterceptor(fieldName || 'file',{
                fileFilter: fileFilter
            })
        )
    )
}
