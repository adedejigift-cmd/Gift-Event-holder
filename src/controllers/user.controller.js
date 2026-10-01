const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { registerSchema } = require('../validators/auth.validator');
const sendVerificationEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const verificationToken = crypto.randomBytes(32).toString('hex');
const verificationTokenExpires = new Date(
    Date.now() + 60 * 60 * 1000
);

const register = async (req, res) => {
    try {
    
        const { error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const { name, email, password } = req.body;

    
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }

    
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpires
        });

        await sendVerificationEmail(email,verificationToken);

        return res.status(201).json({
            message: 'User registered successfully. Please check your email to verify your account.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

const login = async (req, res) => {
    try {
       
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const { email, password } = req.body;

        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        if (!user.isVerified) {
            return res.status(403).json({message: "please verify your email before logging in"});
        }
        
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                message: 'Verification token is required'
            });
        }

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired verification token'
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;

        await user.save();

        return res.status(200).json({
            message: 'Email verified successfully'
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

module.exports = {
    register,
    login,
    verifyEmail
};