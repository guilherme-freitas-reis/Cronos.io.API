"use strict";
import nodeoutlook from "nodejs-nodemailer-outlook";

const sendMail = (mailOptions) => {
  nodeoutlook.sendEmail({
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    from: process.env.EMAIL,
    to: mailOptions.to,
    subject: mailOptions.subject,
    html: mailOptions.html,
    text: mailOptions.text,
    onError: (e) => console.log(e),
  });
};

export default sendMail;
