interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}
export declare const sendMailFunction: (mail_options: MailOptions) => Promise<string>;
export {};
