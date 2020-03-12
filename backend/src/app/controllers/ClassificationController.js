import Classification from '../models/Classification';

class ClassificationController {
  async index(req, res) {
    const classification = await Classification.findAll();

    return res.json(classification);
  }

  async store(req, res) {
    const classification = await Classification.create(req.body);
    return res.json(classification);
  }

  async update(req, res) {
    const classification = await Classification.findOne({
      where: { id: req.params.id },
    });

    classification.name = req.body.name;

    const newClassification = await classification.save();

    return res.json(newClassification);
  }

  async delete(req, res) {
    return res.json();
  }
}
export default new ClassificationController();
