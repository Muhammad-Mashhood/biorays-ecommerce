const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send contact form email
exports.sendContactEmail = async (req, res) => {
  const { name, email, phone, comment } = req.body;
  
  try {
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <h3>Message:</h3>
        <p>${comment}</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};

// Send subscription confirmation
exports.sendSubscriptionEmail = async (req, res) => {
  const { email } = req.body;
  
  try {
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to BIORAYS Newsletter',
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You have successfully subscribed to BIORAYS newsletter.</p>
        <p>You'll now receive updates about our latest products and offers.</p>
        <p>Best regards,<br>The BIORAYS Team</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Also notify admin
    const adminNotification = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Newsletter Subscription',
      html: `<p>New subscriber: ${email}</p>`
    };
    
    await transporter.sendMail(adminNotification);
    
    res.status(200).json({ success: true, message: 'Subscription successful' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, message: 'Subscription failed' });
  }
};

// Send password reset email
exports.sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;
  
  try {
    // Generate reset token (this would be handled by your auth system)
    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Reset Your Password</h2>
        <p>You requested a password reset for your BIORAYS account.</p>
        <p>Click the button below to reset your password:</p>
        <p>
          <a href="${resetLink}" style="background-color:#00A19C;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;display:inline-block;">
            Reset Password
          </a>
        </p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Reset email sent' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, message: 'Failed to send reset email' });
  }
};