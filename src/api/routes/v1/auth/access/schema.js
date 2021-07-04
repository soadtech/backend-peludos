import Joi from 'joi';

export default {
    login: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    }),
}
