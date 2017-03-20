import Boom from 'boom';
import crypto from 'crypto';
import user from '../models/user';
import { secret } from '../config';

const create = function create(data, next) {
  const payload = data;
  const hashPassword = crypto.createHmac('sha256', secret).update(data.password).digest('hex');

  payload.password = hashPassword;

  user
    .create(payload)
    .then(user => next(null, user))
    .catch(err => next(Boom.badRequest(err)));
};

module.exports = () => [
  {
    name: 'user.create',
    method: create,
  },
];
