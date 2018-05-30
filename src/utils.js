const jwt = require('jsonwebtoken');

function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization');
  const token = Authorization && Authorization.replace('Bearer ', '');
  if (token && token !== 'null') {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  throw new AuthError();
}

class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

module.exports = {
  getUserId,
  AuthError
};
