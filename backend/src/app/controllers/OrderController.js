import * as Yup from 'yup';
import { Op } from 'sequelize';
import Order from '../models/Order';
import Provider from '../models/Provider';
import Product from '../models/Product';
import Audit from '../models/Audit';

class OrderControll {
  async index(req, res) {
    if (req.query.canceled === 'true') {
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

    if (req.query.canceledOnly === 'true') {
      const order = await Order.findAll({
        where: {
          canceled_at: {
            [Op.ne]: null,
          },
        },
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

    const order = await Order.findAll({
      where: { canceled_at: null },
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

    if (req.body.quantity <= 0) {
      return res
        .status(400)
        .json({ error: 'You cannot create a order with quantity 0 or less' });
    }

    if (req.body.canceled_at) {
      return res
        .status(401)
        .json({ error: 'Orders can only be canceled on order problems' });
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

    Audit.create({
      operation: req.method,
      register_id: order.id,
      table: 'Order',
      user_id: req.userId,
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

    if (req.body.quantity && req.body.quantity <= 0) {
      return res
        .status(400)
        .json({ error: 'You cannot modify a order with quantity 0 or less' });
    }

    if (req.body.canceled_at) {
      return res
        .status(401)
        .json({ error: 'Orders can only be canceled on order problems' });
    }

    const checkOrder = await Order.findOne({
      where: { id: req.params.id },
    });

    if (!checkOrder) {
      return res.status(401).json({ error: 'Order does not exists' });
    }

    const order = await checkOrder.update(req.body);

    Audit.create({
      operation: req.method,
      register_id: order.id,
      table: 'Order',
      user_id: req.userId,
    });

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

    Audit.create({
      operation: req.method,
      register_id: order.id,
      table: 'Order',
      user_id: req.userId,
    });

    return res.json(order);
  }
}

export default new OrderControll();
