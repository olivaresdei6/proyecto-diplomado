import {Module} from "@nestjs/common";
import {MailerModule} from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { envConfiguration } from "../../config/env.config";
import {join} from 'path';
import {MailService} from "./mail.service";
import {MailUserRepository} from "./repositories";

@Module({
    
    imports: [
        MailerModule.forRootAsync({
            
            useFactory: () => ({
                
                transport: {
                    host: envConfiguration().emailHost,
                    port: envConfiguration().emailPort,
                    secure: false, // Adds STARTTLS support para mandar correos desde gmail
                    auth: {
                        user: envConfiguration().emailUser,
                        pass: envConfiguration().emailPassword,
                    },
                },
                defaults: {
                    from: `"No Reply" <cvcarautomotriz@gmail.com>`,
                },
                template: {
                    dir: join(__dirname, '/template'),
                    adapter: new HandlebarsAdapter(), // or new PugAdapter()
                    options: {
                        strict: true,
                    }
                }
            })
        })
    ],
    
    providers: [MailService, MailUserRepository],
    exports: [MailService]
})
export class MailModule {
}
