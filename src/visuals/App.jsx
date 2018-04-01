import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Material UI comps
import AppBar from 'material-ui/AppBar'

import { PendingSellOrders } from '../containers/PendingSellOrders'
import { PendingBuyOrders } from '../containers/PendingBuyOrders'
import { FilledOrders } from '../containers/FilledOrders'
import { OrderChart } from '../containers/OrderChart'

import { NUMBER_MAX_ACTIVITY_DELAY, NUMBER_MIN_ACTIVITY_DELAY } from '../constants'

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

  beginActivity = () => {
    let interval
    let delayActivity = NUMBER_MIN_ACTIVITY_DELAY
    const randomizeActivity = () => {
      this.props.addRandomOrder()
      // Get a random delay between min and max
      delayActivity = Math.round(
        Math.random() * (NUMBER_MAX_ACTIVITY_DELAY - NUMBER_MIN_ACTIVITY_DELAY)
      ) + NUMBER_MIN_ACTIVITY_DELAY
      clearInterval(interval)
      interval = setInterval(randomizeActivity, delayActivity)
    }
    // Kick things off
    interval = setInterval(randomizeActivity, delayActivity)
  }

  componentDidMount() {
    this.props.populateInitialOrders()
    this.beginActivity()
  }

  render() {
    return (
      <Wrapper>
        <AppBar title="Coin Xchange" showMenuIconButton={false} />
        <OrdersWrapper>
          <PendingSellOrders />
          <PendingBuyOrders />
          <OrderChart />
          <FilledOrders />
        </OrdersWrapper>
      </Wrapper>
    )
  }
}
