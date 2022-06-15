import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user) {
    const {_id,expireAt,userName,email}=user;
    const expireTime = Math.round(
      (new Date(expireAt).getTime() - new Date().getTime()) / 60000,
    );
    var timeConvert = function(expireTime){
      var minutes = expireTime%60
      var hours = (expireTime - minutes) / 60
      return hours + ":" + minutes;
     }
    const convertedExpireTime= timeConvert(expireTime);

    await this.mailerService.sendMail({
      to: `${email}`,
      subject: 'Email Verification',
      template: '/email',
      context: {
        userName:userName.split('.')[0],
        expireTime: convertedExpireTime,
        userId:_id.toString(),
      },
    });
  }
}
