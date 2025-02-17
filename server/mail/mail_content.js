const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (email, firstName, lastName) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "swumedicalcenter.phinma@gmail.com",
      pass: process.env.MAILER_KEY,
    },
  });

  const htmlContent = `
        <div style="text-align: center; padding: 20px;">
           
            <h2>Hello ${firstName} ${lastName}!</h2>
            <p>This is from Southwestern University Medical Center Mount Grace Partner. Your One-Time Pin (OTP) is <strong>${otp}</strong>.</p>
            <p>Please use this pin to proceed with your verification.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
        </div>
    `;

  let mailOptions = {
    from: "swumedicalcenter.phinma@gmail.com",
    to: email,
    subject: "Your SWU Medical Center OTP",
    html: htmlContent,
  };

  const emailInfo = await transporter.sendMail(mailOptions);
  return { emailInfo, otp };
};

const sendNotification = async (email, firstName, lastName) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "swumedicalcenter.phinma@gmail.com",
      pass: process.env.MAILER_KEY,
    },
  });

  const htmlContent = `
        <div style="text-align: center; padding: 20px;">
            <h2>Hello ${firstName} ${lastName},</h2>
            <p>We are pleased to inform you that your files are now ready for download from Southwestern University Medical Center Mount Grace Partner.</p>
            <p>Please log in to your account to access and download your files.</p>
            <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
            <p>Best regards,<br/>The Southwestern University Medical Center Mount Grace Partner Team</p>
        </div>
    `;

  let mailOptions = {
    from: "swumedicalcenter.phinma@gmail.com",
    to: email,
    subject: "SWU Medical Center Files Ready for Download",
    html: htmlContent,
  };

  const emailInfo = await transporter.sendMail(mailOptions);
  return { emailInfo };
};

module.exports = { sendMail, sendNotification };
