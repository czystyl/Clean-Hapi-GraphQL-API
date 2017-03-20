import user from '../models/user';
import { privateKey } from '../config';

const validate = function auth(decoded, request, callback) {
  user.findOne({ email: decoded.email }, (err, user) => {
    if (user) {
      return callback(err, true, user);
    }

    if (err) {
      return callback(err, false, {});
    }

    return callback(err, false, {});
  });
};

const register = (server, options, next) => {
  server.auth.strategy('token', 'jwt', {
    key: privateKey,
    validateFunc: validate,
    cookieKey: 'access_token',
    verifyOptions: {
      algorithms: ['HS256'],
      maxAge: '22h',
    },
  });

  next();
};

register.attributes = {
  name: 'auth-plugin',
};

export default register;
