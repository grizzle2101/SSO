import nodemailer from "nodemailer";
import fs from "fs";
import mjml2html from "mjml";

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

  async sendEmail(recipient: string, subject: string, message: string) {
    const template = mjml2html(this.accountTemplate);

    var mailOptions = {
      from: this.emailAccount,
      to: recipient,
      subject: subject,
      html: template.html,
    };

    return await this.smtpTransport.sendMail(mailOptions);
  }
}
