const nodemailer = require("nodemailer");
const config = require("../config/config");

// create a test account
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.smtp.smtp_name,
    pass: config.smtp.smtp_pass,
  },
});

// send email
const emailWithNodemailer = async (emailData) => {
  try {
    const mailOptions = {
      from: config.smtp.smtp_name,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.response);
  } catch (error) {
    console.error("Error occured while sending email", error);
    throw error;
  }
};

module.exports = emailWithNodemailer;
