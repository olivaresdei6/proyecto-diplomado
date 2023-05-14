import {Injectable, OnApplicationBootstrap} from "@nestjs/common";
import {IMailAbstract, IUserEmailRepositoryAbstract} from "./core/abstract";
import {MailUserRepository} from "./repositories";


@Injectable()
export class MailService implements IMailAbstract, OnApplicationBootstrap {
    public userMail: IUserEmailRepositoryAbstract;
    
    constructor(private readonly mailUserRepository: MailUserRepository) {
        this.userMail = mailUserRepository;
    }
    
    public onApplicationBootstrap() {}
    
}
