import Orderproblem from '../models/Orderproblem';
import Order from '../models/Order';

class OrderproblemController {
  async index(req, res) {
    const problem = await Orderproblem.findAll();
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

    const order = await Order.findByPk(checkProblem.order_id);

    if (order.canceled_at !== null) {
      return res.status(401).json({ error: 'The order is already canceled' });
    }

    order.canceled_at = new Date();

    await order.save();

    return res.json(order);
  }
}

export default new OrderproblemController();
