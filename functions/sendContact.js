require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  try {
    const { name, email, message, subject } = JSON.parse(event.body);
    const referenceId = Math.floor(100000 + Math.random() * 900000);

    const receiverEmail = {
      to: "varunsingh151509@gmail.com",
      from: "varundeepsingh+inft3102-01@dcmail.ca",
      subject: `[Automated] ${subject} by ${name}`,
      html: `
        <p><strong>New Message Received:</strong></p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Ref ID:</strong> ${referenceId}</p>
      `,
    };

    const senderConfirmation = {
      to: email,
      from: "varundeepsingh+inft3102-01@dcmail.ca",
      subject: `✅ Thank you for contacting I Doubt! [Ref #${referenceId}]`,
      html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for your message. Here's your reference ID: <strong>${referenceId}</strong>.</p>
        <p>We'll get back to you shortly.</p>
        <br/>
        <p><strong>– I Doubt Team</strong></p>
      `,
    };

    await sgMail.send([receiverEmail, senderConfirmation]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent", referenceId }),
    };
  } catch (error) {
    console.error("Email failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email failed to send" }),
    };
  }
};
