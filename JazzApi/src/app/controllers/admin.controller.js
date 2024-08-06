const adminService = require('../services/admin.service');
const { AdminNotFoundError, InvalidCredentialsError } = require('../errors/admin.errors');

const getAdmin = async (req, res) => {
  try {
    const admin = await adminService.getAdmin(req.params.id);
    if (!admin) {
      throw new AdminNotFoundError();
    }
    res.status(200).json(admin);
  } catch (error) {
    if (error instanceof AdminNotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const updateAdmin = async (req, res) => {
  try {
    const admin = await adminService.updateAdmin(req.params.id, req.body);
    if (!admin) {
      throw new AdminNotFoundError();
    }
    res.status(200).json(admin);
  } catch (error) {
    if (error instanceof AdminNotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const loginAdmin = async (req, res) => {
  try {
    const token = await adminService.loginAdmin(req.body);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = {
  getAdmin,
  updateAdmin,
  loginAdmin,
};
