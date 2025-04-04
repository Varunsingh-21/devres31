require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    const referenceId = Math.floor(100000 + Math.random() * 900000);

    const receiverEmail = {
      to: "varunsingh151509@gmail.com",
      from: "varundeepsingh+inft3102-01@dcmail.ca", // must be verified on SendGrid
      subject: `[Automated] ${subject} from ${name}`,
      html: `
        <p><strong>You received a new message via I Doubt:</strong></p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
        <hr/>
        <p><strong>Ref ID:</strong> ${referenceId}</p>
      `,
    };

    const senderConfirmation = {
      to: email,
      from: "varundeepsingh+inft3102-01@dcmail.ca",
      subject: `✅ Message received [Ref #${referenceId}]`,
      html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for contacting DevResolve! 🙌</p>
        <p>We've received your message and will get back to you soon.</p>
        <p><strong>Ref ID:</strong> ${referenceId}</p>
        <br/>
        <p>Best regards,<br/><strong> Team DevResolve</strong></p>
      `,
    };

    await sgMail.send([receiverEmail, senderConfirmation]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully", referenceId }),
    };
  } catch (error) {
    console.error("SendGrid error:", error);
    if (error.response) {
      console.error("SendGrid details:", error.response.body.errors);
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};
