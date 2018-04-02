/* Magic numbers */
/* ------------- */
// Initial market data seeding
export const NUMBER_INITIAL_BUY_ORDERS = 100
export const NUMBER_INITIAL_SELL_ORDERS = 100
export const NUMBER_INITIAL_MIN_PRICE = 99
export const NUMBER_INITIAL_MAX_PRICE = 100
export const NUMBER_INITIAL_ORDER_SCALING = 10

// How many total orders are kept in memory
export const NUMBER_MAX_ORDERS = 1000

/* Market activity factors */
/* ----------------------- */
// Min and max delay for simulated market activity (buy or sell)
export const ACTIVITY_DELAY_MIN_MS = 100
export const ACTIVITY_DELAY_MAX_MS = 500

/* Factors for bullish / bearish nature of the market (1-100, higher meaning more bullish/bearish)
 * Since the naive market factor is calculated as a ratio between these numbers,
 * these factors shouldn't differ by too large an amount (+- half of MARKET_VOLATILITY)
 */
export const MARKET_BULLISH = 50
export const MARKET_BEARISH = 50

// General market volatility factor (1-100, higher meaning more volatile)
export const MARKET_VOLATILITY = 10

// The lowest price the market should ever dip (negative price doesn't make sense)
export const MARKET_LOWEST_PRICE = 0.01

// A scaling factor for random order amounts
export const MARKET_VOLUME_SEED = 10

// Size of time buckets for price graph, in seconds
export const NUMBER_SECONDS_CHART_GROUPING = 5

// Order types
export const TYPE_BUY = 'BUY'
export const TYPE_SELL = 'SELL'
export const TYPE_UNKNOWN = 'UNKNOWN'

// Order statuses
export const STATUS_PENDING = 'PENDING'
export const STATUS_FILLED = 'FILLED'

// Actions
export const ACTION_ADD_ORDER = 'ACTION_ADD_ORDER'
export const ACTION_ADD_RANDOM_ORDER = 'ACTION_ADD_RANDOM_ORDER'
export const ACTION_POPULATE_INITIAL_ORDERS = 'ACTION_POPULATE_INITIAL_ORDERS'
