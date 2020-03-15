import Order from '../models/Order';
import Provider from '../models/Provider';
import Product from '../models/Product';

class OrderControll {
  async index(req, res) {
    const order = await Order.findAll({
      include: [
        {
          model: Provider,
          as: 'provider',
          attributes: ['name', 'register_number'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['name'],
        },
      ],
    });
    return res.json(order);
  }

  async store(req, res) {
    const order = await Order.create(req.body);

    const newOrder = await Order.findOne({
      where: { id: order.id },
      include: [
        {
          model: Provider,
          as: 'provider',
          attributes: ['name', 'register_number'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['name'],
        },
      ],
    });
    return res.json(newOrder);
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    const order = await Order.findOne({
      where: { id: req.params.id },
    });

    await order.destroy();

    return res.json(order);
  }
}

export default new OrderControll();
