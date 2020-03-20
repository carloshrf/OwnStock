import Sequelize, { Model } from 'sequelize';
import Product from './Product';
// import QuantityController from '../controllers/QuantityController';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        type: Sequelize.BOOLEAN, // true: input false: output
        quantity: Sequelize.INTEGER,
        price: Sequelize.DECIMAL,
        canceled_at: Sequelize.DATE,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async order => {
      if (order.quantity) {
        const product = await Product.findByPk(order.product_id);
        if (order.type === true) {
          product.quantity += order.quantity;
          product.save();
        } else {
          product.quantity -= order.quantity;
          product.save();
        }
      }
    });

    // this.addHook('beforeUpdate', async order => {
    //   console.log(this.quantity, order.quantity);

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
    // });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Provider, {
      foreignKey: 'provider_id',
      as: 'provider',
    });

    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });
  }
}

export default Order;
