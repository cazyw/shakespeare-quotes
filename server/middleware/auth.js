const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Authorisation denied: no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PVT);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: `Authorisation denied: token is invalid ${error}` });
  }
};