import moment from 'moment'

import {
  NUMBER_MAX_PRICE,
  NUMBER_SCALE_ORDER_AMOUNT,
  NUMBER_MIN_PRICE,
  TYPE_BUY,
  TYPE_SELL,
} from '../constants'

// Get a random non-zero decimal
export const getRandomDecimal = () => Math.random() + 0.00000001

// Get a random order amount, scaled by a constant
export const getRandomAmount = () => getRandomDecimal() * NUMBER_SCALE_ORDER_AMOUNT

// Get a random order price between the prescribed min and max
export const getRandomPrice = () => (getRandomDecimal() * (NUMBER_MAX_PRICE - NUMBER_MIN_PRICE)) + NUMBER_MIN_PRICE

// Get a random int between min and max, inclusive
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// Get a random order type
export const getRandomOrderType = () => {
  switch (getRandomInt(1, 2)) {
    case 1:
      return TYPE_BUY
    case 2:
      return TYPE_SELL
    default: // shouldn't be needed, but included anyways
      return TYPE_BUY
  }
}

// Rounding
export const roundTwoDecimals = num => Math.round(num * 100) / 100
export const roundSatoshiDecimals = num => Math.round(num * 100000000) / 100000000

// Rounding time / moments
export const roundMoment = (date, duration, mathMethod) => moment(Math[mathMethod]((+date) / (+duration)) * (+duration))

// Display decimals
export const displayTwoDecimals = num => parseFloat(num).toFixed(2)
export const displaySatoshiDecimals = num => parseFloat(num).toFixed(8)
