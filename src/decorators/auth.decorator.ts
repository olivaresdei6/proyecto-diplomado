import {applyDecorators, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AuthUsuarioGuard} from "../guards/auth-usuario-guard.service";

export const Auth = () => {
    return  applyDecorators(
        UseGuards(
            AuthGuard('jwt'),
            AuthUsuarioGuard
        )
    )
}
