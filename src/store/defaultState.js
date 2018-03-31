import Immutable from 'immutable'

export const defaultState = {
  orders: {
    orderCount: 0,
    ordersMap: Immutable.Map(),
  },
}
