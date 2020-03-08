import User from '../models/User';

class UserController {
  async index(req, res) {
    const user = await User.findAll();

    return res.json(user);
  }

  async store(req, res) {
    const user = await User.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    const checkUser = await User.findByPk(req.params.id);

    return res.json(checkUser);
  }

  async delete(req, res) {
    const checkUser = await User.findByPk(req.params.id);

    return res.json(checkUser);
  }
}

export default new UserController();
