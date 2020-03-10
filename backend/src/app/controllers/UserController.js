// import * as Yup from 'yup';
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

    if (!checkUser) {
      return res.status(400).json({ error: 'This user does not exists' });
    }

    const oldUser = await checkUser.destroy();

    return res.json(oldUser);
  }
}

export default new UserController();
