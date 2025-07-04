// import sgMail from '@sendgrid/mail';
// import dotenv from 'dotenv';
// dotenv.config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// export const sendEmail = async (to, subject, text) => {
//   const msg = {
//     to,
//     from: process.env.SENDER_EMAIL,
//     subject,
//     text,
//   };

//   try {
//     await sgMail.send(msg);
//     return true;
//   } catch (error) {
//     console.error('Email send error:', error);
//     return false;
//   }
// };

// utils/emailService.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, text, html = null) => {
  try {
    const msg = {
      to,
      from: process.env.SENDER_EMAIL, 
      subject,
      text,
      ...(html && { html }),
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('SendGrid Email Error:', error.response?.body || error.message);
    return false;
  }
};

