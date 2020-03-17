import * as Yup from 'yup';
import { parseISO } from 'date-fns';
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
    const schema = Yup.object().shape({
      type: Yup.boolean().required(),
      product_id: Yup.number().required(),
      provider_id: Yup.number().required(),
      quantity: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }

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
    const schema = Yup.object().shape({
      type: Yup.boolean(),
      product_id: Yup.number(),
      provider_id: Yup.number(),
      quantity: Yup.number(),
      price: Yup.number(),
      canceled_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data validation fails' });
    }

    const canceled = req.body.canceled_at;

    if (canceled) {
      req.body.canceled_at = parseISO(req.body.canceled_at);
    }

    const checkOrder = await Order.findOne({
      where: { id: req.params.id },
    });

    if (!checkOrder) {
      return res.status(401).json({ error: 'Order does not exists' });
    }

    const order = await checkOrder.update(req.body);

    return res.json(order);
  }

  async delete(req, res) {
    const order = await Order.findOne({
      where: { id: req.params.id },
    });

    if (!order) {
      return res.status(401).json({ error: 'Order does not exists' });
    }

    await order.destroy();

    return res.json(order);
  }
}

export default new OrderControll();
