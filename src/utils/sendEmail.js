const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendVerificationEmail = async (email, token) => {

    const verificationLink =
        `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your EventHorizon account',
        html: `
            <h2>Welcome to EventHorizon</h2>

            <p>Please verify your email address by clicking the link below:</p>

            <a href="${verificationLink}">
                Verify my email
            </a>

            <p>This link will expire in 1 hour.</p>
        `
    });
};

module.exports = sendVerificationEmail;