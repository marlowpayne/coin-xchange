import moment from 'moment'

import {
  STATUS_PENDING,
  STATUS_FILLED,
  TYPE_BUY,
  TYPE_SELL,
  NUMBER_MAX_ORDERS,
} from '../constants'

// Fill orders in state in a pure manner
export const fillOrders = (state) => {
  // Working copies
  let newState = state
  let newOrdersMap = newState.ordersMap
  // Easier to work with sorted JS arrays
  const ordersArray = newOrdersMap.toArray()

  // Divide out pending buy and sell orders, sorted in descending price order
  const buyOrders = ordersArray
    .filter(order => order.status === STATUS_PENDING)
    .filter(order => order.type === TYPE_BUY)
    .sort((orderA, orderB) => orderB.price - orderA.price)
  const sellOrders = ordersArray
    .filter(order => order.status === STATUS_PENDING)
    .filter(order => order.type === TYPE_SELL)
    .sort((orderA, orderB) => orderA.price - orderB.price)

  if (sellOrders.length === 0 || buyOrders.length === 0) {
    // No orders to fill
    return state
  }

  let sellIdx = 0
  let buyIdx = 0
  const numBuyOrders = buyOrders.length
  const numSellOrders = sellOrders.length
  let { lastTradePrice } = state

  // Check if any buy orders can fill the sell order
  while (sellIdx < numSellOrders && buyIdx < numBuyOrders) {
    let buyOrder = buyOrders[buyIdx]
    let sellOrder = sellOrders[sellIdx]

    if (buyOrder.price >= sellOrder.price) {
      // An order will be filled
      const newBuyOrderAmount = buyOrder.amount - sellOrder.amount
      if (newBuyOrderAmount === 0) {
        // Both buy and sell orders are filled
        newOrdersMap = newOrdersMap.set(buyOrder.id, { ...newOrdersMap.get(buyOrder.id), status: STATUS_FILLED, lastModified: moment() })
        newOrdersMap = newOrdersMap.set(sellOrder.id, { ...newOrdersMap.get(sellOrder.id), status: STATUS_FILLED, lastModified: moment() })
        lastTradePrice = sellOrder.price

        buyIdx += 1
        sellIdx += 1
      } else if (newBuyOrderAmount > 0) {
        // Sell order is filled, but not buy order
        newOrdersMap = newOrdersMap.set(sellOrder.id, { ...newOrdersMap.get(sellOrder.id), status: STATUS_FILLED, lastModified: moment() })
        newOrdersMap = newOrdersMap.set(buyOrder.id, { ...newOrdersMap.get(buyOrder.id), amount: newBuyOrderAmount, lastModified: moment() })
        lastTradePrice = sellOrder.price

        sellIdx += 1
      } else {
        // Buy order is filled, but not sell order
        newOrdersMap = newOrdersMap.set(buyOrder.id, { ...newOrdersMap.get(buyOrder.id), status: STATUS_FILLED, lastModified: moment() })
        newOrdersMap = newOrdersMap.set(sellOrder.id, { ...newOrdersMap.get(sellOrder.id), amount: -1 * newBuyOrderAmount, lastModified: moment() })
        lastTradePrice = buyOrder.price

        buyIdx += 1
      }
    } else {
      // No order filled, advance to next sell order
      sellIdx += 1
    }
  }
  return { ...newState, ordersMap: newOrdersMap, lastTradePrice }
}

// Ensure total number of orders does not exceed the maximum
const trimOrders = (state) => {
  let newOrdersMap = state.ordersMap
  const ordersArray = newOrdersMap.toArray()
  const numOrdersToDelete = newOrdersMap.size - NUMBER_MAX_ORDERS
  let ordersToDelete = []

  if (numOrdersToDelete > 0) {
    // Find the oldest filled orders
    ordersToDelete = ordersArray
      .filter(order => order.status === STATUS_FILLED)
      .sort((orderA, orderB) => orderA.lastModified - orderB.lastModified)

    if (ordersToDelete.length < numOrdersToDelete) {
      // Next orders to delete are buy orders with the smallest prices
      ordersToDelete = ordersArray
        .filter(order => order.status === STATUS_PENDING)
        .filter(order => order.type === TYPE_BUY)
        .sort((orderA, orderB) => orderA.price - orderB.price)
    }
    if (ordersToDelete.length < numOrdersToDelete) {
      // Final orders to delete are sell orders with the largest prices
      ordersToDelete = ordersArray
        .filter(order => order.status === STATUS_PENDING)
        .filter(order => order.type === TYPE_SELL)
        .sort((orderA, orderB) => orderB.price - orderA.price)
    }

    for (let i = 0; i < numOrdersToDelete; i += 1) {
      const orderIdToDelete = ordersToDelete[i].id
      newOrdersMap = newOrdersMap.delete(orderIdToDelete)
    }
  }
  return { ...state, ordersMap: newOrdersMap }
}

// Purely add a new order to state, check for too many orders, fill any orders possible, and return new state
export const addNewOrder = (state, type, price, amount) => {
  const newId = state.orderCount + 1
  const newOrder = {
    id: newId,
    type: type,
    price: price,
    amount: amount,
    status: STATUS_PENDING,
    lastModified: moment(),
  }
  let newState = { ...state, orderCount: newId, ordersMap: state.ordersMap.set(newId, newOrder) }
  newState = trimOrders(newState)
  return fillOrders(newState)
}
