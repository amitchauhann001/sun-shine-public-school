import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';

// @desc  Submit admission application
// @route POST /api/admissions
// @access Public
const submitAdmission = asyncHandler(async (req, res) => {
  const { studentName, parentName, phone, email, studentClass, message } = req.body;
  const photo = req.file;

  if (!studentName || !parentName || !phone || !studentClass || !email) {
    res.status(400);
    throw new Error('Please provide all required fields.');
  }

  const currentDateTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // 1. Notify School
    const mailOptions = {
      from: `"Sun Shine School Admission" <${process.env.EMAIL_USER}>`,
      to: 'sunshinepublicschoolghansali@gmail.com',
      replyTo: email,
      subject: `New Admission Application - SSPS`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e3a5f; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">New Form Submission - Sun Shine Public School</h2>
          <p><strong>Student Name:</strong> ${studentName}</p>
          <p><strong>Father/Parent Name:</strong> ${parentName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Class:</strong> ${studentClass}</p>
          <p><strong>Admission Details:</strong> Application for academic year 2026-27.</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
            <p style="white-space: pre-wrap; margin: 0;">${message || 'N/A'}</p>
          </div>
          <hr style="margin: 20px 0; border-color: #e2e8f0;" />
          <p style="color: #64748b; font-size: 0.85rem;"><strong>Submitted On:</strong> ${currentDateTime}</p>
          <p style="color: #64748b; font-size: 0.85rem;">Student photo is attached to this email.</p>
        </div>
      `,
      attachments: photo ? [{
        filename: photo.originalname,
        path: photo.path
      }] : []
    };

    await transporter.sendMail(mailOptions);

    // 2. Send Auto-reply to Parent
    const autoReplyOptions = {
      from: `"Sun Shine Public School" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for your Admission Application - SSPS`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e3a5f;">Thank you for your Admission Application</h2>
          <p>Dear ${parentName},</p>
          <p>We have received the admission application for <strong>${studentName}</strong>.</p>
          <p>Our admissions team will review the details and contact you shortly.</p>
          <p>Best regards,<br/>Sun Shine Public School Admissions Office</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(autoReplyOptions);
    } catch(err) {
      console.error('Auto-reply failed', err);
    }

    res.status(200).json({ message: 'Your form has been submitted successfully.' });
  } catch (error) {
    console.error('Admission Email sending failed:', error.message);
    res.status(500);
    throw new Error('Failed to send message. Please try again later.');
  }
});

export { submitAdmission };
