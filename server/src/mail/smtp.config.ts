import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

require('dotenv').config();
const hostName = process.env.SMTP_HOST;
const sender = process.env.SMTP_SENDER;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

export const smtpConfig = {
  transport: {
    host: hostName,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  },
  defaults: {
    from: sender,
  },
  template: {
    dir: join(__dirname, '../../src/templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
