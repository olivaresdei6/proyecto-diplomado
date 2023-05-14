import {IUserEmailRepositoryAbstract} from "./user_email.repository-abstract";


export abstract class IMailAbstract {
    public abstract readonly userMail : IUserEmailRepositoryAbstract;
}
