// import * as Yup from 'yup';
import * as Yup from 'yup';
import { Op } from 'sequelize';
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
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }

    const checkUser = await User.findByPk(req.params.id);

    if (!checkUser) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    if (req.body.email) {
      const checkEmail = await User.findOne({
        where: {
          id: { [Op.ne]: checkUser.id },
          email: req.body.email,
        },
      });

      if (checkEmail) {
        return res
          .status(401)
          .json({ error: 'The email address is already in use' });
      }
    }

    const { oldPassword, password, confirmPassword } = req.body;

    if (oldPassword || password || confirmPassword) {
      if (oldPassword && !(await checkUser.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Old password does not match' });
      }

      if (password !== confirmPassword) {
        return res.status(401).json({
          error: 'New password does not match with confirm password',
        });
      }
    }

    const { id, name, email, job } = await checkUser.update(req.body);

    return res.json({ id, name, email, job });
  }

  async delete(req, res) {
    const checkUser = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'job'],
    });

    if (!checkUser) {
      return res.status(400).json({ error: 'This user does not exists' });
    }

    await checkUser.destroy();

    return res.json(checkUser);
  }
}

export default new UserController();
