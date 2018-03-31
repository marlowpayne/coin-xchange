import React from 'react'
import styled from 'styled-components'

import { Order } from './Order'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`
const AmountHeader = styled.div`
  grid-column: 1;
  grid-row: 1;
`
const PriceHeader = styled.div`
  grid-column: 2;
  grid-row: 1;
`
const OrdersWrapper = styled.div`
  grid-column: 1 / span 2;
  grid-row: 2;
`

export const OrderList = ({ orders }) => (
  <Grid>
    <AmountHeader>Amount</AmountHeader>
    <PriceHeader>Price ($)</PriceHeader>
    <OrdersWrapper>
      {orders.map(order => <Order key={order.id} {...order} />)}
    </OrdersWrapper>
  </Grid>
)
