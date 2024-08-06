const authService = require('../services/auth.services');
const {
  ClientNotFoundError,
  InvalidPasswordError,
  AdminNotFoundError,
  InvalidEmailOrPasswordError,
  InvalidTokenError
} = require('../errors/auth.errors');

const loginClient = async (req, res) => {
  try {
    const { token, name } = await authService.loginClient(req.body);
    res.status(200).json({ token, name });
  } catch (error) {
    if (error instanceof ClientNotFoundError || error instanceof InvalidPasswordError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { token, name } = await authService.loginAdmin(req.body);
    res.status(200).json({ token, name });
  } catch (error) {
    if (error instanceof AdminNotFoundError || error instanceof InvalidEmailOrPasswordError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const getUserByToken = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const user = await authService.getUserByToken(token);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = {
  loginClient,
  loginAdmin,
  getUserByToken,
};
