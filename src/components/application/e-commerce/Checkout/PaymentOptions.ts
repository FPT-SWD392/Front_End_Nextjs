// types
import { PaymentOptionsProps } from 'types/e-commerce';

// assets
const paypal = '/assets/images/e-commerce/paypal.png';

// ==============================|| CHECKOUT - PAYMENT OPTIONS ||============================== //

const PaymentOptions: PaymentOptionsProps[] = [
  {
    id: 1,
    value: 'vnpay',
    title: 'VN Pay',
    caption: 'You will be redirected to PayPal website to complete your purchase securely.',
    image: paypal,
    size: {
      width: 16,
      height: 16
    }
  },
];

export default PaymentOptions;
