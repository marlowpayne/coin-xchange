import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// Material UI comps
import Subheader from 'material-ui/Subheader'

import { TYPE_BUY, STATUS_PENDING } from '../constants'
import { OrderList } from '../visuals/OrderList'
import { media } from '../utils'

const Wrapper = styled.div`
  width: 20vw;
  ${media.laptop`width: 80vw;`}
  padding: 1vw;
  ${media.laptop`height: 30vh;`}
  ${media.laptop`overflow-y: auto;`}
`

const Visual = ({ orders }) => {
  const buyOrders = orders
    .filter(order => order.status === STATUS_PENDING)
    .filter(order => order.type === TYPE_BUY)
    .sort((orderA, orderB) => orderB.price - orderA.price)

  return (
    <Wrapper>
      <Subheader>Buy Orders</Subheader>
      <OrderList orders={buyOrders} />
    </Wrapper>
  )
}

const mapStateToProps = storeState => ({
  orders: storeState.orders.ordersMap.toArray(),
  count: storeState.orders.orderCount,
})

export const PendingBuyOrders = connect(mapStateToProps)(Visual)
