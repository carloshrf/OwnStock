import * as Yup from 'yup';
import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const product = await Product.findAll();

    return res.json(product);
  }

  async store(req, res) {
    const product = await Product.create(req.body);

    return res.json(product);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      category: Yup.string(),
      quantity: Yup.number(),
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
