"use strict";
async function getMailFunction(from, to, subject, text, html) {
  let mailsent = await transporter.sendMail({
    from, // sender address
    to, // list of receivers
    subject, // Subject line
    text,
    html
  });
  return mailsent;
}

module.exports = { transporter, sendMail };
