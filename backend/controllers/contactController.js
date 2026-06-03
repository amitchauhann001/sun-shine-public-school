import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';
import fs from 'fs';
import path from 'path';

// Helper function to send submission to Google Sheets via Apps Script
const sendToGoogleSheet = async (submission) => {
  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!sheetUrl) {
    console.warn('⚠️ GOOGLE_SHEET_WEBHOOK_URL not set in .env — skipping Google Sheets.');
    return false;
  }

  try {
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
      redirect: 'follow', // Apps Script redirects on POST
    });
    const result = await response.json();
    if (result.status === 'success') {
      console.log('✅ Submission saved to Google Sheet.');
      return true;
    } else {
      console.error('⚠️ Google Sheet returned error:', result.message);
      return false;
    }
  } catch (err) {
    console.error('⚠️ Failed to send to Google Sheet:', err.message);
    return false;
  }
};

// Helper function to append submission to CSV spreadsheet
const appendToSpreadsheet = async (submission) => {
  const uploadDir = path.join(process.cwd(), 'uploads');
  const filePath = path.join(uploadDir, 'submissions.csv');
  
  // Ensure uploads directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  const headers = ['Date', 'Time', 'Name', 'Parent Name', 'Phone', 'Email', 'Class Interested', 'Message'];
  
  const escapeCSV = (str) => {
    if (str === undefined || str === null) return '""';
    const stringVal = String(str);
    return `"${stringVal.replace(/"/g, '""')}"`;
  };
  
  const rowData = [
    submission.date,
    submission.time,
    submission.name,
    submission.parentName || '',
    submission.phone || '',
    submission.email,
    submission.classInterested || '',
    submission.message
  ];
  
  const csvRow = rowData.map(escapeCSV).join(',') + '\n';
  
  if (!fs.existsSync(filePath)) {
    const headerRow = headers.map(escapeCSV).join(',') + '\n';
    fs.writeFileSync(filePath, headerRow + csvRow, 'utf8');
  } else {
    fs.appendFileSync(filePath, csvRow, 'utf8');
  }
};

// @desc  Send contact form email and save to spreadsheet
// @route POST /api/contact
// @access Public
const sendContactEmail = asyncHandler(async (req, res) => {
  const { name, parentName, phone, email, classInterested, message } = req.body;

  // Validate all required fields
  if (!name || !phone || !email || !message) {
    res.status(400);
    throw new Error('Please provide name, phone, email, and message.');
  }

  // Get current India date and time
  const now = new Date();
  const date = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
  const time = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });

  let spreadsheetSuccess = false;
  let googleSheetSuccess = false;

  const submissionData = {
    date,
    time,
    name,
    parentName,
    phone,
    email,
    classInterested,
    message
  };

  // Save to local CSV spreadsheet
  try {
    await appendToSpreadsheet(submissionData);
    spreadsheetSuccess = true;
  } catch (err) {
    console.error('⚠️ CSV spreadsheet storage failed:', err.message);
  }

  // Save to Google Sheet
  try {
    googleSheetSuccess = await sendToGoogleSheet(submissionData);
  } catch (err) {
    console.error('⚠️ Google Sheet storage failed:', err.message);
  }

  // Configure transporter securely
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let emailSuccess = false;
  try {
    // Send notification to School
    const mailOptions = {
      from: `"Sun Shine Public School Portal" <${process.env.EMAIL_USER}>`,
      to: 'sunshinepublicschoolghansali@gmail.com',
      replyTo: email,
      subject: 'New Contact Form Submission – Sun Shine Public School',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 150px;">Name:</td>
              <td style="padding: 8px 0; color: #1e293b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Parent's Name:</td>
              <td style="padding: 8px 0; color: #1e293b;">${parentName || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
              <td style="padding: 8px 0; color: #1e293b;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
              <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Class Interested:</td>
              <td style="padding: 8px 0; color: #1e293b;">${classInterested || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Submitted At:</td>
              <td style="padding: 8px 0; color: #1e293b;">${date} at ${time}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="font-weight: bold; color: #475569; margin-bottom: 8px;">Message:</p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; color: #1e293b;">
              <p style="white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
          </div>
          <hr style="margin: 20px 0; border-color: #e2e8f0;" />
          <p style="color: #64748b; font-size: 0.8rem; text-align: center; margin: 0;">
            This email was automatically sent from the Sun Shine Public School Web Portal.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    emailSuccess = true;

    // Send auto-reply to User
    const autoReplyOptions = {
      from: `"Sun Shine Public School" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Sun Shine Public School',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e3a8a; margin-top: 0;">Thank you for contacting us</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you shortly.</p>
          <p>Best regards,<br/><strong>Sun Shine Public School Team</strong></p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(autoReplyOptions);
    } catch(err) {
      console.error('Auto-reply failed', err);
    }
  } catch (error) {
    console.error('⚠️ Email notification sending failed:', error.message);
    console.warn('The submission was successfully saved to the spreadsheet despite the email failure.');
  }

  // If either spreadsheet or Google Sheet logging succeeded, we consider this a successful transaction
  if (spreadsheetSuccess || googleSheetSuccess) {
    res.status(200).json({ 
      message: 'Thank you! Your message has been submitted successfully. We will contact you soon.',
      spreadsheetSaved: spreadsheetSuccess,
      googleSheetSaved: googleSheetSuccess,
      emailSent: emailSuccess
    });
  } else {
    res.status(500);
    throw new Error('Failed to record submission. Please try again later.');
  }
});

export { sendContactEmail };
