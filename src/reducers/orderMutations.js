import moment from 'moment'

import {
  STATUS_PENDING,
  STATUS_FILLED,
  TYPE_BUY,
  TYPE_SELL,
  NUMBER_MAX_ORDERS,
  MARKET_BULLISH,
  MARKET_BEARISH,
  MARKET_VOLATILITY,
  MARKET_LOWEST_PRICE,
  MARKET_VOLUME_SEED,
} from '../constants'

import {
  getRandomOrderType,
  getRandomInt,
  getRandomAmount,
  getRandomPrice,
} from '../utils'

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

// Purely add a new randomized order, influenced by prescribed market factors
export const addRandomOrder = (state) => {
  const { lastTradePrice } = state
  const type = getRandomOrderType()

  // Get a naive market factor
  const marketFactor = (getRandomInt(1, MARKET_VOLATILITY) + MARKET_BULLISH) / (getRandomInt(1, MARKET_VOLATILITY) + MARKET_BEARISH)

  const priceFluctuation = marketFactor * lastTradePrice

  let price = lastTradePrice
  if (marketFactor > 1) {
    // Presumed bullish market, drive the price higher
    const buyOrders = state.ordersMap.toArray()
      .filter(order => order.status === STATUS_PENDING)
      .filter(order => order.type === TYPE_BUY)
      .sort((orderA, orderB) => orderB.price - orderA.price)
    const currentMaxBuy = buyOrders.length > 0 ? buyOrders[0].price : lastTradePrice

    const low = Math.min(lastTradePrice, currentMaxBuy)
    const high = Math.max(lastTradePrice + priceFluctuation, currentMaxBuy + priceFluctuation)

    price = getRandomPrice(low, high)
  } else if (marketFactor < 1) {
    // Presumed bearish market, drive the price lower
    const sellOrders = state.ordersMap.toArray()
      .filter(order => order.status === STATUS_PENDING)
      .filter(order => order.type === TYPE_SELL)
      .sort((orderA, orderB) => orderA.price - orderB.price)
    const currentLowestSell = sellOrders.length > 0 ? sellOrders[0].price : lastTradePrice

    const low = Math.min(
      Math.max(lastTradePrice - priceFluctuation, MARKET_LOWEST_PRICE),
      Math.max(currentLowestSell - priceFluctuation, MARKET_LOWEST_PRICE),
    )
    const high = Math.max(lastTradePrice, currentLowestSell)

    price = getRandomPrice(low, high)
  }

  const amount = getRandomAmount(marketFactor * MARKET_VOLUME_SEED)

  return addNewOrder(state, type, price, amount)
}
