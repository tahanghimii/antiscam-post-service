const axios = require('axios');

// Middleware to validate JWT using the auth service
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided or invalid token format' });
    }

    const token = authHeader.replace('Bearer ', '').trim();

    // Call the auth service for token validation
    const response = await axios.get('http://localhost:8080/auth-service/api/auth/validate', {
      headers: { Authorization: `Bearer ${token}` },
    });

    req.user = response.data.user; // Extract the user object correctly
    console.log('Authenticated user:', req.user);
    
    next();
  } catch (error) {
    console.error('Token validation failed:', error.response?.data || error.message);

    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json(data);
    }

    return res.status(500).json({ error: 'Internal server error during token validation' });
  }
};


module.exports = authMiddleware;
