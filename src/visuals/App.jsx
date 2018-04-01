import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Material UI comps
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'

import { AddOrder } from './AddOrder'
import { PendingSellOrders } from '../containers/PendingSellOrders'
import { PendingBuyOrders } from '../containers/PendingBuyOrders'
import { FilledOrders } from '../containers/FilledOrders'

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  text-align: center;
`
const OrdersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 75vh;
`

export class App extends React.Component {
  static propTypes = {
    addNewOrder: PropTypes.func.isRequired,
    addRandomOrder: PropTypes.func.isRequired,
    populateInitialOrders: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.populateInitialOrders()
  }

  render() {
    const { addRandomOrder, addNewOrder } = this.props

    return (
      <Wrapper>
        <AppBar title="Coin Xchange" showMenuIconButton={false} />
        <OrdersWrapper>
          <PendingSellOrders />
          <PendingBuyOrders />
          <FilledOrders />
        </OrdersWrapper>
        <AddOrder onSubmit={addNewOrder} />
        <RaisedButton label="Add a Random Order" primary onClick={addRandomOrder} />
      </Wrapper>
    )
  }
}
