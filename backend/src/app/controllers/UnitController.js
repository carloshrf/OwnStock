import * as Yup from 'yup';
import Unit from '../models/Unit';

class UnitControll {
  async index(req, res) {
    const unit = await Unit.findAll();

    return res.json(unit);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      symbol: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }

    const unit = await Unit.create(req.body);

    return res.json(unit);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      symbol: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }

    const unit = await Unit.findOne({
      where: { id: req.params.id },
    });

    if (!unit) {
      return res
        .status(401)
        .json({ error: 'Does not have an unit with this ID' });
    }

    await unit.update(req.body);

    return res.json({
      id: unit.id,
      name: unit.name,
      symbol: unit.symbol,
    });
  }

  async delete(req, res) {
    const unit = await Unit.findOne({
      where: { id: req.params.id },
    });

    if (!unit) {
      return res.status(401).json({ error: 'Unit does not exists' });
    }

    await unit.destroy();

    return res.json(unit);
  }
}

export default new UnitControll();
