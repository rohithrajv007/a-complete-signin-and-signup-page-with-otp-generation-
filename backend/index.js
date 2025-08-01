// --- 1. IMPORTS ---
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

// --- 2. INITIALIZATION ---
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Your Gmail address from .env
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password from .env
    },
});

// --- 3. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- 4. ROUTES ---
app.get('/', (req, res) => {
  res.send('Hello from the OTP Auth Backend (with Prisma)!');
});

// SIGNUP ROUTE
app.post('/api/signup', async (req, res) => {
    try {
        // 1. Get user data from the request body
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // 2. Check if a user with this email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // 3. Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // 4. Create the new user in the database
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password_hash,
            },
        });

        // 5. Send a success response (don't send the password hash back)
        res.status(201).json({
            message: 'User created successfully!',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server error during signup.' });
    }
});
app.post('/api/login', async (req, res) => {
    try {
        // 1. Get user data from request body
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // 2. Find the user by their email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // 3. Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // 4. Create a JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // 5. Send a success response with the token
        res.status(200).json({
            message: 'Logged in successfully!',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});
app.post('/api/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        // Security: Always send a success-like response to prevent email enumeration
        if (!user) {
            return res.status(200).json({ message: 'If a user with that email exists, an OTP has been sent.' });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires_at = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

        // Store OTP in the database
        await prisma.otp.create({
            data: { email, otp, expires_at },
        });

        // Send OTP via email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Your Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
            html: `<p>Your OTP for password reset is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to your email successfully.' });

    } catch (error) {
        console.error('Forgot Password Error:', error);
        res.status(500).json({ message: 'Server error while sending OTP.' });
    }
});
// ------------------------------------

// --- NEW: VERIFY OTP & RESET PASSWORD ROUTE ---
app.post('/api/verify-otp', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Find the most recent OTP for the email that matches and is not expired
        const otpRecord = await prisma.otp.findFirst({
            where: {
                email,
                otp,
                expires_at: { gt: new Date() }, // 'gt' means greater than
            },
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        await prisma.user.update({
            where: { email },
            data: { password_hash },
        });

        // Delete the used OTP
        await prisma.otp.delete({
            where: { id: otpRecord.id },
        });

        res.status(200).json({ message: 'Password has been reset successfully.' });

    } catch (error) {
        console.error('Verify OTP Error:', error);
        res.status(500).json({ message: 'Server error during password reset.' });
    }
});


// --- 5. SERVER START ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
