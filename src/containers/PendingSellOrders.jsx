import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// Material UI comps
import Subheader from 'material-ui/Subheader'

import { TYPE_SELL, STATUS_PENDING } from '../constants'
import { OrderList } from '../visuals/OrderList'

const Wrapper = styled.div`
  height: 75vh;
  overflow-y: auto;
`

const Visual = ({ orders }) => {
  const sellOrders = orders
    .filter(order => order.status === STATUS_PENDING)
    .filter(order => order.type === TYPE_SELL)
    .sort((orderA, orderB) => orderA.price - orderB.price)

  return (
    <Wrapper>
      <Subheader>Sell Orders</Subheader>
      <OrderList orders={sellOrders} />
    </Wrapper>
  )
}

const mapStateToProps = storeState => ({
  orders: storeState.orders.ordersMap.toArray(),
  count: storeState.orders.orderCount,
})

export const PendingSellOrders = connect(mapStateToProps)(Visual)
