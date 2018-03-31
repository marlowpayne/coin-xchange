import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Pulse } from './Pulse'
import { STATUS_PENDING, TYPE_BUY } from '../constants'
import { displayTwoDecimals, displaySatoshiDecimals } from '../utils'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  color: ${p => p.type === TYPE_BUY ? 'green': 'red'};
`
const Number = styled.div``

export class Order extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    status: PropTypes.string,
  }

  static defaultProps = {
    status: STATUS_PENDING,
  }

  constructor(props) {
    super(props)
    this.state = {
      orderShouldPulse: false,
      amountShouldPulse: false,
    }
  }

  componentDidMount() {
    // Ensure order row can pulse on mount
    requestAnimationFrame(() => this.setState({
      orderShouldPulse: true,
      amountShouldPulse: true,
    }))
  }

  componentWillReceiveProps(nextProps) {
    const doesAmountUpdate = nextProps.amount !== this.props.amount

    if (doesAmountUpdate) {
      // Flip bool to trigger pulse animation
      this.setState({ amountShouldPulse: !this.state.amountShouldPulse })
    }
  }

  render() {
    const { type, amount, price } = this.props
    const { orderShouldPulse, amountShouldPulse } = this.state
    return (
      <Pulse in={orderShouldPulse}>
        <Wrapper {...{ type }}>
          <Pulse in={amountShouldPulse}>
            <Number>{displaySatoshiDecimals(amount)}</Number>
          </Pulse>

          <Number>{displayTwoDecimals(price)}</Number>
        </Wrapper>
      </Pulse>
    )
  }
}
