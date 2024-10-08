import nodemailer from "nodemailer";
import { config } from "dotenv";
import { InternalServerErrorException } from '@nestjs/common';

config();

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendMailFunction = async (mail_options: MailOptions): Promise<string> => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'reportsrealestate@gmail.com',
        pass: 'wnmq bnip zrqg ucxf',
      },
    });

    const info = await transporter.sendMail(mail_options);

    return info.response;
  } catch (error) {
    throw new InternalServerErrorException(`Error sending email: ${error.message}`);
  }
};
