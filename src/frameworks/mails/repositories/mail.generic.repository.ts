import {IGenericRepository} from "../core/abstract/mail-generic.abstract";
import {ResponseEmailInterface} from "../interfaces/responseEmail.interface";
import {MailerService} from "@nestjs-modules/mailer";
import {SendEmailInterface} from "../interfaces/sendEmail.interface";
import { InternalServerErrorException } from "@nestjs/common";


export class MailGenericRepository implements IGenericRepository {
    
    public async sendMail(sendEmail: SendEmailInterface, mailerService: MailerService): Promise<ResponseEmailInterface> {
        try {
            const {mail, subject, template, name, from_email, method, url} = sendEmail;
            await mailerService.sendMail({
                to: `${mail}`,
                from: ` "Support Team"  <${from_email}>`,
                subject: subject,
                template: template,
                context: {
                    name: `${name}`,
                    url,
                    method,
                }
            });
    
            return {
                message: 'Email sent successfully',
            }
        }catch (e) {
            throw new InternalServerErrorException(e.message)
        }
    }
}
