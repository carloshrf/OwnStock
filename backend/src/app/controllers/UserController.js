// import * as Yup from 'yup';
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const user = await User.findAll({
      attributes: ['id', 'name', 'email', 'job'],
    });

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      job: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }

    const checkUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (checkUser) {
      return res
        .status(401)
        .json({ error: 'There is an user registred with this e-mail' });
    }

    const { id, name, email, job } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      job,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      job: Yup.string(),
      password: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }

    const checkUser = await User.findByPk(req.params.id);

    if (!checkUser) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    if (req.body.email) {
    }

    return res.json(checkUser);
  }

  async delete(req, res) {
    const checkUser = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'job',]
    });

    if (!checkUser) {
      return res.status(400).json({ error: 'This user does not exists' });
    }

    await checkUser.destroy();

    return res.json(checkUser);
  }
}

export default new UserController();
