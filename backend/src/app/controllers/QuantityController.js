// import Product from '../models/Product';
// import Order from '../models/Order';

// class QuantityController {
//   async updateOnCreate(productId, quantity, type) {
//     if (quantity) {
//       const product = await Product.findByPk(productId);
//       if (type === true) {
//         product.quantity += quantity;
//         product.save();
//       } else {
//         product.quantity -= quantity;
//         product.save();
//       }
//     }

//     return true;
//   }
// }

// export default new QuantityController();
