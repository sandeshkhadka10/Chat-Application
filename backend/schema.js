import Joi from "joi";

export const usersRegisterSchema = Joi.object({
    email:Joi.string().required(),
    username:Joi.string().required(),
    password:Joi.string().required()
});

export const usersLoginSchema = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required()
});

export const forgetPasswordSchema = Joi.object({
    email:Joi.string().required()
});

export const resetPasswordSchema = Joi.object({
    email:Joi.string().required(),
    resetCode:Joi.string().required(),
    newPassword:Joi.string().required()
});