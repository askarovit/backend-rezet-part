const axios = require('axios');
import { constants } from '@shared/config';
import { StatePaymentEnum } from '@shared/enum';

type MakePaymentBodyType = {
  userInfo: {
    email: string,
    name:  string,
    phone: string,
    address: string,
    shipping: string
  },
  order: {
    carts: {
      [id: number]: {
        amount: number
      }
    },
    totalAmount: number
  }
}

export const getListCarts = () => {
  const url = constants.MOCK_API + '/carts';
  return axios({
    method: 'get',
    url
  });
};

export const makePayment = async (body: MakePaymentBodyType) => {
  const { order , userInfo: { shipping }} = body;
  const url = constants.MOCK_API + '/delivery';
  const { data } = await axios({
    method: 'get',
    url
  });

  if (!data) {
    throw { payment: StatePaymentEnum.Rejected }
  }

  let finalPrice = order.totalAmount;

  if (finalPrice  < data[0].priceFrom) {

    for(let item of data) {
      if (item.title === shipping) {
        finalPrice += item.price;
        return { payment: StatePaymentEnum.Payed, finalPrice };
      }
    }
  }

  return { payment: StatePaymentEnum.Payed, finalPrice };
};