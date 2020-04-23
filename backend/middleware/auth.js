var jwtDecode = require('jwt-decode');

module.exports = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const decoded = jwtDecode(token);
    if(!!decoded.email) {
      next();
    } else {
      res.json({err: 'token error'});
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}