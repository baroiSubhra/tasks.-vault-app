const admin = require('firebase-admin');

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authorization.split('Bearer ')[1];

  admin.auth().verifyIdToken(token)
    .then(decodedToken => {
      console.log('verified');
      req.user = decodedToken;
      next();
    })
    .catch(error => {
      console.log('not verified');
      console.error('Authentication error:', error);
      return res.status(403).json({ error: 'Forbidden' });
    });
};

module.exports = authenticate;
