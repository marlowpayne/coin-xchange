import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Material UI comps
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { TYPE_BUY, TYPE_SELL } from '../constants'

const Wrapper = styled.div``

export class AddOrder extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      price: '',
      amount: '',
      type: TYPE_BUY,
    }
  }

  onPriceChange = event => this.setState({ price: event.target.value })

  onAmountChange = event => this.setState({ amount: event.target.value })

  onTypeChange = (event, index, value) => this.setState({ type: value })

  onOrderSubmit = () => {
    const { onSubmit } = this.props
    const { type } = this.state

    // Rest of app state has this data as numbers
    const price = parseFloat(this.state.price)
    const amount = parseFloat(this.state.amount)

    if (price !== 0 && !isNaN(price) && amount !== 0 && !isNaN(amount) && !!type) {
      onSubmit({ type, price, amount })
      // Clear state
      this.setState({
        price: '',
        amount: '',
      })
    }
  }

  render() {
    const { price, amount, type } = this.state

    return (
      <Wrapper>
        <SelectField
          floatingLabelText="Order Type"
          value={type}
          onChange={this.onTypeChange}
        >
          <MenuItem value={TYPE_BUY} primaryText="Buy" />
          <MenuItem value={TYPE_SELL} primaryText="Sell" />
        </SelectField>

        <TextField floatingLabelText="Price" type="number" value={price} onChange={this.onPriceChange} />
        <TextField floatingLabelText="Amount" type="number" value={amount} onChange={this.onAmountChange} />
        <RaisedButton label="Add Order" primary onClick={this.onOrderSubmit} />
      </Wrapper>
    )
  }
}
