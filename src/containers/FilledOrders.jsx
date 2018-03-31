import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// Material UI comps
import Subheader from 'material-ui/Subheader'

import { STATUS_FILLED } from '../constants'
import { OrderList } from '../visuals/OrderList'

const Wrapper = styled.div`
  height: 75vh;
  overflow-y: auto;
`

const Visual = ({ orders }) => {
  const filledOrders = orders.filter(order => order.status === STATUS_FILLED).sort((orderA, orderB) => orderB.lastModified - orderA.lastModified)

  return (
    <Wrapper>
      <Subheader>Filled Orders</Subheader>
      <OrderList orders={filledOrders} />
    </Wrapper>
  )
}

const mapStateToProps = storeState => ({ orders: storeState.orders.ordersMap.toArray(), count: storeState.orders.orderCount })

export const FilledOrders = connect(mapStateToProps)(Visual)
