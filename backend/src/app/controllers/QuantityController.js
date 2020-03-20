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

    return product.save();
  }
}

//   if (order.quantity) {
//     const product = await Product.findByPk(order.product_id);
//     console.log(this.order.quantity, order.quantity);
//     if (order.type === true) {
//       product.quantity -= this.order.quantity - order.quantity;
//       product.save();
//     } else {
//       product.save();
//     }
//   }

export default new QuantityController();
