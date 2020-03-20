import Product from '../models/Product';

class QuantityController {
  async updateOnCreate(prodId, newQuantity, type) {
    const product = await Product.findByPk(prodId);

    if (type === true) {
      product.quantity += newQuantity;
    } else {
      product.id -= newQuantity;
    }

    await product.save();
  }
}

export default new QuantityController();
