import * as Yup from 'yup';
import Unit from '../models/Unit';
import Classification from '../models/Classification';
import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    if (req.query.id) {
      const product = await Product.findByPk(req.query.id, {
        include: [
          {
            model: Unit,
            as: 'unit',
            attributes: ['symbol', 'name'],
          },
          {
            model: Classification,
            as: 'classification',
            attributes: ['name'],
          },
        ],
      });
      return res.json(product);
    }

    const product = await Product.findAll({
      include: [
        {
          model: Unit,
          as: 'unit',
          attributes: ['symbol', 'name'],
        },
        {
          model: Classification,
          as: 'classification',
          attributes: ['name'],
        },
      ],
    });

    return res.json(product);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      classification_id: Yup.number(),
      quantity: Yup.number(),
      unit_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation fails' });
    }

    const product = await Product.create(req.body);

    return res.json(product);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      classification_id: Yup.number(),
      quantity: Yup.number(),
      unit_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation fails' });
    }

    const product = await Product.findOne({
      where: { id: req.params.id },
    });

    if (!product) {
      return res.status(401).json({ error: 'This product does not exists' });
    }

    const newProduct = await product.update(req.body);

    return res.json(newProduct);
  }

  async delete(req, res) {
    const product = await Product.findOne({
      where: { id: req.params.id },
    });

    if (!product) {
      return res.status(401).json({ error: 'This product does not exists' });
    }

    await product.destroy();

    return res.json(product);
  }
}

export default new ProductController();
