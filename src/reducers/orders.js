import { defaultState } from '../store/defaultState'
import { addNewOrder } from './orderMutations'
import {
  ACTION_ADD_ORDER,
  ACTION_ADD_RANDOM_ORDER,
  ACTION_POPULATE_INITIAL_ORDERS,
  TYPE_BUY,
  TYPE_SELL,
} from '../constants'
import {
  getRandomPrice,
  getRandomAmount,
  getRandomOrderType,
  roundTwoDecimals,
  roundSatoshiDecimals,
} from '../utils'

export const orders = (state = defaultState.orders, action) => {
  switch (action.type) {
    case ACTION_ADD_ORDER:
      return addNewOrder(state, action.payload.type, roundTwoDecimals(action.payload.price), roundSatoshiDecimals(action.payload.amount))
    case ACTION_ADD_RANDOM_ORDER:
      return addNewOrder(state, getRandomOrderType(), roundTwoDecimals(getRandomPrice()), roundSatoshiDecimals(getRandomAmount()))
    case ACTION_POPULATE_INITIAL_ORDERS:
      let newState = state
      for (let i = 0; i < action.payload.numberBuyOrders; i++) {
        newState = addNewOrder(newState, TYPE_BUY, roundTwoDecimals(getRandomPrice()), roundSatoshiDecimals(getRandomAmount()))
      }
      for (let i = 0; i < action.payload.numberSellOrders; i++) {
        newState = addNewOrder(newState, TYPE_SELL, roundTwoDecimals(getRandomPrice()), roundSatoshiDecimals(getRandomAmount()))
      }
      return newState
    default:
      return state
  }
}
