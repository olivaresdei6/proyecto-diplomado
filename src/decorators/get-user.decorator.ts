import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common";

export const GetUser = createParamDecorator(
    ( data, ctx:ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
      console.log('Se obtuvo el usuario');
        const usuario = req.user
        if (!usuario) {
            throw new ForbiddenException('Usuario no autenticado');
        }
        return (!data) ? usuario : usuario[data];
    }
)
