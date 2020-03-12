import * as Yup from 'yup';
import Classification from '../models/Classification';

class ClassificationController {
  async index(req, res) {
    const classification = await Classification.findAll();

    return res.json(classification);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }

    const classification = await Classification.create(req.body);
    return res.json(classification);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }
    const classification = await Classification.findOne({
      where: { id: req.params.id },
    });

    if (!classification) {
      return res
        .status(401)
        .json({ error: 'This classification ID do not exists' });
    }

    classification.name = req.body.name;

    const newClassification = await classification.save();

    return res.json(newClassification);
  }

  async delete(req, res) {
    const classification = await Classification.findByPk(req.params.id);

    if (!classification) {
      return res.status(401).json({
        error: 'Does not exists a classification with the informed ID',
      });
    }

    await classification.destroy();

    return res.json(classification);
  }
}
export default new ClassificationController();
