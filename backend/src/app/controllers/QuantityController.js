import Product from '../models/Product';

class QuantityController {
  async changeOnCreate(prodId, orderQuantity, type) {
    const product = await Product.findByPk(prodId);

    if (type === true) {
      product.quantity += orderQuantity;
    } else {
      product.quantity -= orderQuantity;
    }

    await product.save();
  }

  async changeOnUpdate(prodId, orderQuantity, newOrderQuantity, type) {
    const product = await Product.findByPk(prodId);

    if (type === true && orderQuantity !== newOrderQuantity) {
      product.quantity -= orderQuantity - newOrderQuantity;
    }
    if (type === false && orderQuantity !== newOrderQuantity) {
      product.quantity += orderQuantity - newOrderQuantity;
    }

    const a = product.Model.name;
    console.log(a);

    return product.save();
  }
}

export default new QuantityController();
