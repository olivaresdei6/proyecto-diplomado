import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from "../../frameworks/database/mysql/mysql.module";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { MailModule } from "../../frameworks/mails/mail.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { envConfiguration } from "../../config/env.config";
import { JwtStrategy } from "../../strategies/jwt.strategy";

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService, JwtStrategy],
    exports: [UsuarioService, JwtStrategy, PassportModule, JwtModule],
    imports: [
        MySQLDatabaseModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [],
            inject: [],
            useFactory: () => {
                return {
                    secret: envConfiguration().jwtSecret,
                    signOptions: { expiresIn: '7d', algorithm: 'HS512' }
                }
            }
        }),
        MailModule
    ]
})
export class UsuarioModule {}
