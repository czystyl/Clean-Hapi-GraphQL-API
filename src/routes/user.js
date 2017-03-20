const Joi = require('joi');

module.exports = () => [
  {
    method: 'POST',
    path: '/user',
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(1).max(50),
          firstName: Joi.string().min(3).max(50),
          lastName: Joi.string().min(3).max(50),
          phone: Joi.string().min(6).max(50),
        },
      },
      pre: [{ method: 'user.create(payload)', assign: 'user' }],
      handler: (request, reply) => reply(request.pre.user),
    },
  },
];
