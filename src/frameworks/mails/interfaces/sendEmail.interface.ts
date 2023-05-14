export interface SendEmailInterface {
    mail: string;
    from_email: string;
    subject: string;
    template: string;
    name: string;
    method?: methods;
    url?: string;
}

export enum methods {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete'
}
