"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
//  let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  /*host: "in-v3.mailjet.com",
  port: 587,
  secure: false,
  requireTLS: true,
  // true for 465, false for other ports
  auth: {
    user: "826c45effcdb5c3961553e73637c31d5", // generated ethereal user
    pass: "f967f141ac1f4bf7c2100c7b87a5be4b" // generated ethereal password
  }*/
  host: "smtp.gmail.com",
  //port: 465,
  port: 587,
  //secure: true,
  secure: false,
  //requireTLS: true,
  //service: "gmail",
  // true for 465, false for other ports
  auth: {
    user: "vybnmusicapp@gmail.com", // generated ethereal user
    pass: "mobilemusic" // generated ethereal password
  }
});

async function sendMail(from, to, subject, text, html) {
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
