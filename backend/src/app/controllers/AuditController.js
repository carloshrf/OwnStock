import Audit from '../models/Audit';

class AuditController {
  async index(req, res) {
    const audit = await Audit.findAll();

    return res.json(audit);
  }
}

export default new AuditController();
