import Joi from 'joi';

const cookieOptions = {
  ttl: 24 * 60 * 60 * 1000,
  encoding: 'none', // we already used JWT to encode
  isSecure: true, // warm & fuzzy feelings
  isHttpOnly: true, // prevent client alteration
  clearInvalid: false, // remove invalid cookies
  strictHeader: true, // don't allow violations of RFC 6265
};

module.exports = () => [
  {
    method: 'POST',
    path: '/login',
    config: {
      validate: {
        payload: {
          email: Joi.string().required(),
          password: Joi.string().required(),
        },
      },
      pre: [{ method: 'login(payload)' }],
      handler: (request, reply) =>
        reply(request.pre.login).state('access_token', request.pre.login.token, cookieOptions),
    },
  },
];
