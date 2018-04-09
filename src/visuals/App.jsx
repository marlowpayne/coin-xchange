import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Material UI comps
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import { PendingSellOrders } from '../containers/PendingSellOrders'
import { PendingBuyOrders } from '../containers/PendingBuyOrders'
import { FilledOrders } from '../containers/FilledOrders'
import { OrderChart } from '../containers/OrderChart'
import { displayTwoDecimals, media } from '../utils'

import { ACTIVITY_DELAY_MIN_MS, ACTIVITY_DELAY_MAX_MS } from '../constants'

const Root = styled.div``
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
  ${media.laptop`height: fit-content;`}
  ${media.laptop`flex-direction: column;`}
  ${media.laptop`align-items: center;`}
`

export class App extends React.Component {
  static propTypes = {
    addNewOrder: PropTypes.func.isRequired,
    addRandomOrder: PropTypes.func.isRequired,
    populateInitialOrders: PropTypes.func.isRequired,
    lastTradePrice: PropTypes.number,
  }

  static defaultProps = {
    lastTradePrice: 0,
  }

  beginActivity = () => {
    let interval
    let delayActivity = ACTIVITY_DELAY_MIN_MS
    const randomizeActivity = () => {
      this.props.addRandomOrder()
      // Get a random delay between min and max
      delayActivity = Math.round(
        Math.random() * (ACTIVITY_DELAY_MAX_MS - ACTIVITY_DELAY_MIN_MS)
      ) + ACTIVITY_DELAY_MIN_MS
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
    const { lastTradePrice } = this.props

    const lastTradeLabelText = `Last trade price: $${displayTwoDecimals(lastTradePrice)}`
    const LastTradePrice = <FlatButton label={lastTradeLabelText} />

    return (
      <Root>
        <AppBar title="Coin Xchange" showMenuIconButton={false} iconElementRight={LastTradePrice} />
        <Wrapper>
          <OrdersWrapper>
            <PendingSellOrders />
            <PendingBuyOrders />
            <OrderChart />
            <FilledOrders />
          </OrdersWrapper>
        </Wrapper>
      </Root>
    )
  }
}
