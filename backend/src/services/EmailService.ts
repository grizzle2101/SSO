import nodemailer from "nodemailer";
import fs from "fs";
import mjml2html from "mjml";
import { compile } from "handlebars";
import { User } from "../interfaces/user.interface";

export class EmailService {
  private emailAccount = process.env.EMAIL_ACCOUNT;
  private emailPassword = process.env.EMAIL_PASSWORD;
  private templateFolder = `${__dirname}/../templates/`;

  private createAccountPath = `${this.templateFolder}/create-account-template.mjml`;
  private accountTemplate = fs.readFileSync(this.createAccountPath).toString();
  private applicationURL = process.env.APPLICATION_URL;

  smtpTransport = nodemailer.createTransport(
    `smtps://${this.emailAccount}:` +
      encodeURIComponent(this.emailPassword) +
      "@smtp.gmail.com:465"
  );

  compileTemplate(user: User, link: string) {
    const template = compile(this.accountTemplate);
    const mjml = template({ user: user.name, link });
    return mjml2html(mjml);
  }

  generateLink(token: any) {
    return `${this.applicationURL}/password-reset/${token}`;
  }

  async sendPasswordResetEmail(user: User, token: any) {
    let link = this.generateLink(token);
    let complied = this.compileTemplate(user, link);

    var mailOptions = {
      from: this.emailAccount,
      to: user.email,
      subject: "password-reset",
      html: complied.html,
    };

    return await this.smtpTransport.sendMail(mailOptions);
  }
}
