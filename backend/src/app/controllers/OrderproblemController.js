import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Orderproblem from '../models/Orderproblem';
import Order from '../models/Order';
import Provider from '../models/Provider';
import Product from '../models/Product';
import Mail from '../../lib/Mail';
import User from '../models/User';
import Unit from '../models/Unit';

class OrderproblemController {
  async index(req, res) {
    const problem = await Orderproblem.findAll({
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['canceled_at'],
        },
      ],
    });
    return res.json(problem);
  }

  async store(req, res) {
    const problem = await Orderproblem.create(req.body);

    return res.json(problem);
  }

  async update(req, res) {
    const checkProblem = await Orderproblem.findByPk(req.params.id);

    if (!checkProblem) {
      return res
        .status(401)
        .json({ error: 'Does not exists a problem for this order ID' });
    }

    const problem = await checkProblem.update(req.body);

    return res.json(problem);
  }

  async delete(req, res) {
    const checkProblem = await Orderproblem.findByPk(req.params.id);

    if (!checkProblem) {
      return res
        .status(401)
        .json({ error: 'Does not exists a problem for this order ID' });
    }

    const order = await Order.findByPk(checkProblem.order_id, {
      include: [
        {
          model: Provider,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['name', 'unit_id'],
          include: {
            model: Unit,
            as: 'unit',
            attributes: ['symbol'],
          },
        },
      ],
    });

    const user = await User.findByPk(req.userId);

    if (order.canceled_at !== null) {
      return res.status(401).json({ error: 'The order is already canceled' });
    }

    const Type = order.type ? 'Entrada' : 'Saída';

    order.canceled_at = new Date();

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      cc: `${order.provider.name} <${order.provider.email}>`,
      subject: 'Pedido cancelado',
      template: 'cancelation',
      context: {
        user: user.name,
        type: Type,
        provider: order.provider.name,
        product: order.product.name,
        quantity: order.quantity,
        unit: order.product.unit.symbol,
        price: order.price,
        total_value: order.total_value,
        canceled_at: format(order.canceled_at, "dd'/'mm'/'yyyy' ,às 'H:mm'h'", {
          locale: pt,
        }),
        description: checkProblem.description,
      },
    });

    await order.save();

    return res.json(order);
  }
}

export default new OrderproblemController();
