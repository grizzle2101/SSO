import nodemailer from "nodemailer";

export class EmailService {
  private emailAccount = process.env.EMAIL_ACCOUNT;
  private emailPassword = process.env.EMAIL_PASSWORD;

  smtpTransport = nodemailer.createTransport(
    `smtps://${this.emailAccount}:` +
      encodeURIComponent(this.emailPassword) +
      "@smtp.gmail.com:465"
  );

  async sendEmail(recipient: string, subject: string, message: string) {
    var mailOptions = {
      from: this.emailAccount,
      to: recipient,
      subject: subject,
      text: message,
    };

    return await this.smtpTransport.sendMail(mailOptions);
  }
}
