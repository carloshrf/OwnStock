import * as Yup from 'yup';
import Provider from '../models/Provider';

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
      email: Yup.string(),
      phone_number_1: Yup.string(),
      phone_number_2: Yup.string(),
      contact_name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }

    const provider = await Provider.create(req.body);

    return res.json(provider);
  }

  async update(req, res) {
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
      email: Yup.string(),
      phone_number_1: Yup.string(),
      phone_number_2: Yup.string(),
      contact_name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }

    const checkProvider = await Provider.findByPk(req.params.id);
    // STOPPED ===========================================================
    if (req.body.register_number) {
      const checkRegisteNumber = await findOne({
        distinct: 'id',
        where: { register_number: req.body.register_number },
      });
    }

    if (checkProvider.register_number === req.body.register_number) {
      return res.status(401).json({
        error: 'There is a provider registred with this register number',
      });
    }

    const provider = await checkProvider.update(req.body);
    return res.json(provider);
  }

  async delete(req, res) {
    const provider = await Provider.findByPk(req.params.id);
    if (!provider) {
      return res.status(401).json({ error: 'Provider does not exists' });
    }

    await provider.destroy();

    return res.json(provider);
  }
}

export default new ProviderController();
