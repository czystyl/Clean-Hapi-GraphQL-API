import Boom from 'boom';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import user from '../models/user';
import config from '../config';

const login = function login(data, next) {
  const payload = data;

  const hashPassword = crypto
    .createHmac('sha256', config.secret)
    .update(data.password)
    .digest('hex');

  payload.password = hashPassword;

  user.findOne(payload, (err, user) => {
    if (err) {
      return next(Boom.badImplementation());
    }

    if (!user) {
      return next(Boom.badRequest('Authentication failed'));
    }

    const token = jwt.sign({ email: user.email }, config.privateKey);
    return next({ access_token: token });
  });
};

module.exports = () => [
  {
    name: 'login',
    method: login,
    options: {
      generateKey: opts => JSON.stringify(opts),
    },
  },
];
