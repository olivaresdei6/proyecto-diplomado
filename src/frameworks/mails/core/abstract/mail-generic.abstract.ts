import {ResponseEmailInterface} from "../../interfaces/responseEmail.interface";
import {SendEmailInterface} from "../../interfaces/sendEmail.interface";
import {MailerService} from "@nestjs-modules/mailer";


export abstract class IGenericRepository {
    public abstract sendMail(sendMailInterface: SendEmailInterface, mailerService: MailerService): Promise<ResponseEmailInterface>;
}
