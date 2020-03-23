import Sequelize, { Model } from 'sequelize';
import QuantityController from '../controllers/QuantityController';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        type: Sequelize.BOOLEAN, // true: input false: output
        quantity: Sequelize.INTEGER,
        price: Sequelize.DECIMAL,
        canceled_at: Sequelize.DATE,
        description: Sequelize.STRING,
        total_value: {
          type: Sequelize.VIRTUAL,
          get() {
            return (this.quantity * this.price).toFixed(2);
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async order => {
      if (order.quantity) {
        await QuantityController.changeOnCreate(
          order.product_id,
          order.quantity,
          order.type
        );
      }
    });

    this.addHook('beforeUpdate', async order => {
      if (order.quantity) {
        const { quantity } = await Order.findByPk(order.id);
        await QuantityController.changeOnUpdate(
          order.product_id,
          quantity,
          order.quantity,
          order.type
        );
      }
    });

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

  calculateTotalValue(order) {
    return order.price * order.quantity;
  }

  getTableName() {
    return 'Order';
  }
}

export default Order;
