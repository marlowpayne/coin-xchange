import {
  TYPE_BUY,
  TYPE_SELL,
} from '../constants'

// Get a random non-zero decimal
export const getRandomDecimal = () => Math.random() + 0.00000001

// Get a random order amount, scaled by a constant
export const getRandomAmount = scale => getRandomDecimal() * scale

// Get a random order price between the prescribed min and max
export const getRandomPrice = (min, max) => (getRandomDecimal() * (max - min)) + min

// Get a random int between min and max, inclusive
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// Get a random order type, with an optional bias (between 0 and 1) for both buy and sell types
export const getRandomOrderType = (biasBuy = 0, biasSell = 0) => {
  switch (getRandomInt(1 + biasSell / 2, 2 - biasBuy / 2)) {
    case 1:
      return TYPE_BUY
    case 2:
      return TYPE_SELL
    default: // shouldn't be needed, but included anyways
      return TYPE_BUY
  }
}
