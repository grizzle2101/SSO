import nodemailer from "nodemailer";
import fs from "fs";
import mjml2html from "mjml";
import { compile } from "handlebars";

export class EmailService {
  private emailAccount = process.env.EMAIL_ACCOUNT;
  private emailPassword = process.env.EMAIL_PASSWORD;
  private templateFolder = `${__dirname}/../templates/`;

  private createAccountPath = `${this.templateFolder}/create-account-template.mjml`;
  private accountTemplate = fs.readFileSync(this.createAccountPath).toString();

  smtpTransport = nodemailer.createTransport(
    `smtps://${this.emailAccount}:` +
      encodeURIComponent(this.emailPassword) +
      "@smtp.gmail.com:465"
  );

  compileTemplate(name: string) {
    const template = compile(this.accountTemplate);
    const mjml = template({ user: name });
    return mjml2html(mjml);
  }

  async sendEmail(recipient: string, subject: string, message: string) {
    let complied = this.compileTemplate("Conor");

    var mailOptions = {
      from: this.emailAccount,
      to: recipient,
      subject: subject,
      html: complied.html,
    };

    return await this.smtpTransport.sendMail(mailOptions);
  }
}
