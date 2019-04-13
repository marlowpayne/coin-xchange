import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Material UI comps
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import { TYPE_BUY, TYPE_SELL } from "../constants";

const Wrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const FormItem = styled(FormControl)`
  && {
    margin: 10px;
  }
`;

export class AddOrder extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      price: "",
      amount: "",
      type: TYPE_BUY
    };
  }

  onPriceChange = event => this.setState({ price: event.target.value });

  onAmountChange = event => this.setState({ amount: event.target.value });

  onTypeChange = event => this.setState({ type: event.target.value });

  onOrderSubmit = () => {
    const { onSubmit } = this.props;
    const { type } = this.state;

    // Rest of app state has this data as numbers
    const price = parseFloat(this.state.price);
    const amount = parseFloat(this.state.amount);

    if (
      price !== 0 &&
      !isNaN(price) &&
      amount !== 0 &&
      !isNaN(amount) &&
      !!type
    ) {
      onSubmit({ type, price, amount });
      // Clear state
      this.setState({
        price: "",
        amount: ""
      });
    }
  };

  render() {
    const { price, amount, type } = this.state;

    return (
      <Wrapper autoComplete="off">
        <FormItem>
          <InputLabel htmlFor="order-type">Order Type</InputLabel>
          <Select
            value={type}
            onChange={this.onTypeChange}
            inputProps={{
              name: "Order Type",
              id: "order-type"
            }}
          >
            <MenuItem value={TYPE_BUY}>Buy</MenuItem>
            <MenuItem value={TYPE_SELL}>Sell</MenuItem>
          </Select>
        </FormItem>
        <FormItem>
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={this.onPriceChange}
          />
        </FormItem>
        <FormItem>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={this.onAmountChange}
          />
        </FormItem>
        <FormItem>
          <Button
            variant="contained"
            color="primary"
            onClick={this.onOrderSubmit}
          >
            Add Order
          </Button>
        </FormItem>
      </Wrapper>
    );
  }
}
