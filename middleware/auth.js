// middleware is just a function that has access to the request and response cycle & the request and response object
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // get token from the header
  const token = req.header('x-auth-token');

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // pull out the payload in the decoded variable
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    console.log(decoded.user);

    // pass payload inside the req.user so i can access in my get('/') route
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
