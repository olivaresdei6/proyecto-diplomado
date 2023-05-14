import {IGenericRepository} from "./mail-generic.abstract";
import {ResponseEmailInterface} from "../../interfaces/responseEmail.interface";
import {MailerService} from "@nestjs-modules/mailer";


export abstract class IUserEmailRepositoryAbstract extends IGenericRepository {
    public abstract sendConfirmationEmail(email: string, first_name: string, code_auth: string, mailerService: MailerService): Promise<ResponseEmailInterface>;
}
