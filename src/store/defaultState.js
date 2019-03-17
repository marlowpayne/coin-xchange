import Immutable from "immutable";

export const defaultState = {
  orders: {
    lastTradePrice: 0,
    orderCount: 0,
    ordersMap: Immutable.Map()
  }
};
