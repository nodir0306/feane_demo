"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailFunction = void 0;
const nodemailer_1 = require("nodemailer");
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
(0, dotenv_1.config)();
const sendMailFunction = async (mail_options) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
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
    }
    catch (error) {
        throw new common_1.InternalServerErrorException(`Error sending email: ${error.message}`);
    }
};
exports.sendMailFunction = sendMailFunction;
//# sourceMappingURL=gmail.settings.js.map