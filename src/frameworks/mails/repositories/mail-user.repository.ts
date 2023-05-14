import {Injectable} from "@nestjs/common";
import {MailGenericRepository} from "./mail.generic.repository";
import {IUserEmailRepositoryAbstract} from "../core/abstract";
import {ResponseEmailInterface} from "../interfaces/responseEmail.interface";
import {methods, SendEmailInterface} from "../interfaces/sendEmail.interface";
import {envConfiguration} from "../../../config/env.config";
import {MailerService} from "@nestjs-modules/mailer";


@Injectable()
export class MailUserRepository extends MailGenericRepository implements IUserEmailRepositoryAbstract {
    
    public async sendConfirmationEmail(email: string, nombre: string, code_auth: string, mailerService: MailerService): Promise<ResponseEmailInterface> {
        try {
            const sendEmail: SendEmailInterface = {
                mail: email,
                subject: 'Confirmación de cuenta',
                template: 'account_confirmation',
                name: nombre,
                from_email: envConfiguration().emailFrom,
                method: methods.get,
                url: `${envConfiguration().urlFront}/${envConfiguration().urlConfirmAccount}/${code_auth}`,
            };
            return await this.sendMail(sendEmail, mailerService);
        } catch (e) {

        }
    }

}
