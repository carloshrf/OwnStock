import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class CancelationMail {
  get key() {
    return 'CancelationMail';
  }

  async handle({ data }) {
    const { user, order, Type, checkProblem } = data;

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
        canceled_at: format(
          parseISO(order.canceled_at),
          "dd'/'mm'/'yyyy', às 'H:mm'h'",
          {
            locale: pt,
          }
        ),
        description: checkProblem.description,
      },
    });
  }
}

export default new CancelationMail();
