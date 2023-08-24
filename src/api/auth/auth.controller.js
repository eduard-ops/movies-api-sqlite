const authService = require("./auth.service");

class AuthController {
  constructor() {
    this.authService = authService;
  }

  async registration(req, res) {
    const { name, email } = await authService.register(req.body);

    res.status(201).json({ message: "Created", data: { name, email } });
  }

  async login(req, res) {
    const token = await authService.login(req.body);

    res.json({ message: "success", data: { token } });
  }

  async logout(req, res) {
    const { id } = req.user;
    await authService.logout(id);
    res.status(204).json();
  }
}

module.exports = new AuthController();
