const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string()
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(8)
        .pattern(/^[a-zA-Z0-9]+$/)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters',
            'string.pattern.base': 'Password must contain only letters and numbers'
        })
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(8)
        .pattern(/^[a-zA-Z0-9]+$/)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters',
            'string.pattern.base': 'Password must contain only letters and numbers'
        })
});

module.exports = {
    registerSchema,
    loginSchema
};