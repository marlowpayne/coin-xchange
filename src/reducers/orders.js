import { defaultState } from '../store/defaultState'
import { addNewOrder, addRandomOrder } from './orderMutations'
import {
  ACTION_ADD_ORDER,
  ACTION_ADD_RANDOM_ORDER,
  ACTION_POPULATE_INITIAL_ORDERS,
  NUMBER_INITIAL_MIN_PRICE,
  NUMBER_INITIAL_MAX_PRICE,
  NUMBER_INITIAL_ORDER_SCALING,
  TYPE_BUY,
  TYPE_SELL,
} from '../constants'
import {
  getRandomPrice,
  getRandomAmount,
  roundTwoDecimals,
  roundSatoshiDecimals,
} from '../utils'

export const orders = (state = defaultState.orders, action) => {
  switch (action.type) {
    case ACTION_ADD_ORDER:
      return addNewOrder(state, action.payload.type, roundTwoDecimals(action.payload.price), roundSatoshiDecimals(action.payload.amount))
    case ACTION_ADD_RANDOM_ORDER:
      return addRandomOrder(state)
    case ACTION_POPULATE_INITIAL_ORDERS:
      let newState = state
      for (let i = 0; i < action.payload.numberBuyOrders; i++) {
        newState = addNewOrder(
          newState,
          TYPE_BUY,
          roundTwoDecimals(getRandomPrice(NUMBER_INITIAL_MIN_PRICE, NUMBER_INITIAL_MAX_PRICE)),
          roundSatoshiDecimals(getRandomAmount(NUMBER_INITIAL_ORDER_SCALING)),
        )
      }
      for (let i = 0; i < action.payload.numberSellOrders; i++) {
        newState = addNewOrder(
          newState,
          TYPE_SELL,
          roundTwoDecimals(getRandomPrice(NUMBER_INITIAL_MIN_PRICE, NUMBER_INITIAL_MAX_PRICE)),
          roundSatoshiDecimals(getRandomAmount(NUMBER_INITIAL_ORDER_SCALING)),
        )
      }
      return newState
    default:
      return state
  }
}
