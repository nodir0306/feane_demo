import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendMailFunction = (mail_options: MailOptions): void => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.REPORTS_EMAIL,
        pass: process.env.REPORTS_EMAIL_PASS,
      },
    });

    transporter.sendMail(mail_options, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info.response);
      }
    });
  } catch (error) {
    console.log(`Error sending message: ${error}`);
  }
};
