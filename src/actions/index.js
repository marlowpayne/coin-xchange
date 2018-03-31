import {
  ACTION_ADD_ORDER,
  ACTION_ADD_RANDOM_ORDER,
  ACTION_POPULATE_INITIAL_ORDERS,
  NUMBER_INITIAL_BUY_ORDERS,
  NUMBER_INITIAL_SELL_ORDERS,
} from '../constants'

export const addOrder = ({ type, price, amount }) => ({ type: ACTION_ADD_ORDER, payload: { type, price, amount } })
export const addRandomOrder = () => ({ type: ACTION_ADD_RANDOM_ORDER })
export const populateInitialOrders = () => ({
  type: ACTION_POPULATE_INITIAL_ORDERS,
  payload: {
    numberBuyOrders: NUMBER_INITIAL_BUY_ORDERS,
    numberSellOrders: NUMBER_INITIAL_SELL_ORDERS,
  },
})
