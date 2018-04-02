import { connect } from 'react-redux'

import { App as Visual } from '../visuals/App'
import {
  addOrder,
  addRandomOrder,
  populateInitialOrders,
} from '../actions'

const mapStateToProps = storeState => ({ lastTradePrice: storeState.orders.lastTradePrice })

const mapDispatchToProps = dispatch => ({
  addNewOrder: (newOrder) => dispatch(addOrder(newOrder)),
  addRandomOrder: () => dispatch(addRandomOrder()),
  populateInitialOrders: () => dispatch(populateInitialOrders()),
})

export const App = connect(mapStateToProps, mapDispatchToProps)(Visual)
