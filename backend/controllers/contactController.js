import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';

// @desc  Send contact form email
// @route POST /api/contact
// @access Public
const sendContactEmail = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please provide name, email, and message.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Sun Shine Public School Contact Form" <${process.env.GMAIL_USER}>`,
    to: 'sunshineschoolghansali@gmail.com',
    replyTo: email,
    subject: `New Contact Form Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #1e3a5f; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">New Message from School Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
          <p style="white-space: pre-wrap; margin: 0;">${message}</p>
        </div>
        <hr style="margin: 20px 0; border-color: #e2e8f0;" />
        <p style="color: #64748b; font-size: 0.85rem;">This email was sent from the contact form at <strong>Sun Shine Public School</strong> website.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json({ message: 'Message sent successfully!' });
});

export { sendContactEmail };
