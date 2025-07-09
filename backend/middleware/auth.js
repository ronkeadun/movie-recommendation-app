const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded_id = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded_id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};