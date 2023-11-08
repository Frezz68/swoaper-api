const jwt = require('jsonwebtoken');

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in your environment variables');
}

const decryptJwtToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { 
      userId: decoded.id, 
      roles: decoded.roles 
    };
  } catch (error) {
    return null;
  }
};

module.exports = {
  decryptJwtToken,
};
