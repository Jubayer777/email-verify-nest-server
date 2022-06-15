import { smtpConfig } from './mail/smtp.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
require('dotenv').config();

@Module({
  imports: [
    MailerModule.forRoot(smtpConfig),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
  ],
})
export class AppModule {}
