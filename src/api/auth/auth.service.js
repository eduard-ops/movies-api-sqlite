const { User } = require("../../models");

const { createError, generateToken } = require("../../helpers");

const bcrypt = require("bcryptjs");

class AuthService {
  constructor() {
    this.User = User;
  }

  async register(body) {
    const { name, email, password } = body;

    const hashPassword = await bcrypt.hash(password, 8);

    const candidate = await this.checkUserByEmail(email);
    if (candidate) {
      throw createError(409, `User with ${email} already exist`);
    }

    const data = User.create({
      name,
      email,
      password: hashPassword,
    });

    return data;
  }

  async login(body) {
    const { email, password } = body;

    const candidate = await this.checkUserByEmail(email);

    const passCompare = bcrypt.compareSync(password, `${candidate?.password}`);

    if (!candidate || !passCompare) {
      throw createError(401, `Email or password is wrong`);
    }

    const token = generateToken(candidate.id);

    await this.User.update(
      { accessToken: token },
      { where: { id: candidate.id } }
    );

    return token;
  }

  async logout(id) {
    await this.User.update({ accessToken: null }, { where: { id } });
  }

  async checkUserByEmail(email) {
    return await this.User.findOne({ where: { email } });
  }

  async checkUserById(id) {
    return await this.User.findOne({ where: { id } });
  }
}

module.exports = new AuthService();
