// import * as Yup from 'yup';
import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';
import Audit from '../models/Audit';

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

    Audit.create({
      operation: req.method,
      register_id: id,
      table: 'User',
      user_id: req.userId,
    });

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

    Audit.create({
      operation: req.method,
      register_id: id,
      table: 'User',
      user_id: req.userId,
    });

    return res.json({ id, name, email, job });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'job'],
    });

    if (!user) {
      return res.status(400).json({ error: 'This user does not exists' });
    }

    await user.destroy();

    Audit.create({
      operation: req.method,
      register_id: user.id,
      table: 'User',
      user_id: req.userId,
    });

    return res.json(user);
  }
}

export default new UserController();
