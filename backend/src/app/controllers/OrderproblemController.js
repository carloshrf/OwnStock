import Orderproblem from '../models/Orderproblem';

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
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new OrderproblemController();
