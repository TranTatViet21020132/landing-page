import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { sendMailOptions } from '../register/types/sendMail.type';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailerService {
  private readonly mailer: nodemailer.Transporter<SentMessageInfo>;

  constructor() {
    this.mailer = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  htmlBuilder(displayName: string, otp: string) {
    const congratRegister = 'You are successfully registered';
    const welcome =
      'Welcome to our service! We are thrilled to have you as a new member and thank you for choosing to be a part of our platform';

    return `<div style="background-color:#f9f9f9">
      <div style="margin:0px auto;max-width:640px;background:transparent"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px"><div aria-labelledby="mj-column-per-100" class="m_6569668444412426215mj-column-per-100" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px" align="center" border="0"><tbody><tr><td style="width:138px"><a href="${process.env.CLIENT_URL}" target="_blank" ><img alt="" title="" src="https://cdn.discordapp.com/attachments/1130663469037924354/1130664887341813881/image__2_-removebg-preview.png" width="250px" class="CToWUd" data-bit="iit"></a></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div>
            <div style="max-width:640px;margin:0 auto;border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#ffffff"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px"><div aria-labelledby="mj-column-per-100" class="m_6569668444412426215mj-column-per-100" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left"><div style="color:#737f8d;font-family:Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:16px;line-height:24px;text-align:left">
        <h2 style="font-family:Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-weight:500;font-size:20px;color:#4f545c;letter-spacing:0.27px">Hey ${displayName},</h2>
      <p style="color:#4f545c">${congratRegister}</p>
      <p style="color:#4f545c">${welcome}</p>
                </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px background-color=#8daf7" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate" align="center" border="0"><tbody><tr><td style="border:none;border-radius:3px;color:white;padding:15px 19px" align="center" valign="middle" bgcolor="#5865f2">
                  <p class="il" style="color:white">Your OTP is: <span>${otp}</span></p> your email
                </a></td></tr></tbody></table></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:30px 0px"><p style="font-size:1px;margin:0px auto;border-top:1px solid #dcddde;width:100%"></p></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left"><div style="color:#747f8d;font-family:Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:13px;line-height:16px;text-align:left">
      <p>Need help?<br>
      Want to give us feedback? Let us know what you think on our feedback site.</p>
      </div></td></tr></tbody></table></div></td></tr></tbody></table></div>
            </div><div style="margin:0px auto;max-width:640px;background:transparent"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px"><div aria-labelledby="mj-column-per-100" class="m_6569668444412426215mj-column-per-100" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="center"><div style="color:#99aab5;font-family:Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:12px;line-height:24px;text-align:center">
            Sent by TVPBookShop •
          </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="center"><div style="color:#99aab5;font-family:Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:12px;line-height:24px;text-align:center">
          Etown 4, Tan Binh District, Ho Chi Minh City
          </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="left"><div style="color:#000000;font-family:Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:13px;line-height:22px;text-align:left">
            <img src="https://ci6.googleusercontent.com/proxy/tfWhA2bMO55klweACsbs1a78GX5NbfAAxOP42uvc429zllNRVKt65oORuQiYtp82IIXcd5GikN2eazwrUHapn_Hs5tCa764zAhxdG4h7IGEmy50z8SbTyCz37pEKz38lCFcExCjsojxWn0tCLP3gB9aQf1NkstlRxzrt_KskLVj3K140_QpTxSJYizKZWvQvxtirTBWjNJTz2SR413FK67h2uyR7ysoRT9Fg8wU=s0-d-e1-ft#https://discord.com/api/science/442291793892212746/cfddcede-869b-4b7a-befe-cd710c7fcf88.gif?properties=eyJlbWFpbF90eXBlIjogInVzZXJfaXBfYXV0aG9yaXplIn0%3D" width="1" height="1" class="CToWUd" data-bit="iit">
          </div></td></tr></tbody></table></div></td></tr></tbody></table></div></div>`;
  }
  async sendMail(sendMail: sendMailOptions) {
    const { to, subject, displayName, otp } = sendMail;
    let text = '';

    const html = this.htmlBuilder(displayName, otp);
    const mailOptions = {
      from: `Loan Service <${process.env.EMAIL_USERNAME}>`,
      to,
      subject,
      text,
      html,
    };

    try {
      return await this.mailer.sendMail(mailOptions);
    } catch (error) {
      throw new Error(error);
    }
  }
}
