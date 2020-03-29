import * as Yup from 'yup';
import { Op } from 'sequelize';
import Provider from '../models/Provider';
import Audit from '../models/Audit';

class ProviderController {
  async index(req, res) {
    if (req.query.id) {
      const provider = await Provider.findByPk(req.query.id);
      return res.json(provider);
    }

    const provider = await Provider.findAll();
    return res.json(provider);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      type: Yup.boolean().required(),
      register_number: Yup.string().required(),
      country: Yup.string().required(),
      city: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      zip_code: Yup.string().required(),
      email: Yup.string().email(),
      phone_number_1: Yup.string(),
      phone_number_2: Yup.string(),
      contact_name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }

    const checkProvider = await Provider.findOne({
      where: { register_number: req.body.register_number },
    });

    if (checkProvider) {
      return res
        .status(401)
        .json({ error: 'The register number is already registred' });
    }

    const provider = await Provider.create(req.body);

    Audit.create({
      operation: req.method,
      register_id: provider.id,
      table: 'Provider',
      user_id: req.userId,
    });

    return res.json(provider);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      type: Yup.boolean(),
      register_number: Yup.string(),
      country: Yup.string(),
      city: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      zip_code: Yup.string(),
      email: Yup.string(),
      phone_number_1: Yup.string(),
      phone_number_2: Yup.string(),
      contact_name: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }

    const checkProvider = await Provider.findByPk(req.params.id);

    if (!checkProvider) {
      return res.status(401).json({ error: 'Provider ID does not exists' });
    }

    if (req.body.register_number) {
      const checkRegisterNumber = await Provider.findOne({
        where: {
          id: { [Op.ne]: checkProvider.id },
          register_number: req.body.register_number,
        },
      });

      if (checkRegisterNumber) {
        return res.status(401).json({
          error: 'There is a provider registred with this register number',
        });
      }
    }

    const provider = await checkProvider.update(req.body);

    Audit.create({
      operation: req.method,
      register_id: provider.id,
      table: 'Provider',
      user_id: req.userId,
    });

    return res.json(provider);
  }

  async delete(req, res) {
    const provider = await Provider.findByPk(req.params.id);
    if (!provider) {
      return res.status(401).json({ error: 'Provider does not exists' });
    }

    await provider.destroy();

    Audit.create({
      operation: req.method,
      register_id: provider.id,
      table: 'Provider',
      user_id: req.userId,
    });

    return res.json(provider);
  }
}

export default new ProviderController();
