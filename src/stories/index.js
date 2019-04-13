import React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { TYPE_BUY, TYPE_SELL, STATUS_PENDING } from "../constants";

import { AddOrder } from "../visuals/AddOrder";
import { Order } from "../visuals/Order";
import { OrderList } from "../visuals/OrderList";

const alertArgs = args =>
  window.alert(`Returned args: ${JSON.stringify(args)}`);

storiesOf("AddOrder", module)
  .addDecorator(story => <MuiThemeProvider>{story()}</MuiThemeProvider>)
  .add("Default", () => <AddOrder onSubmit={alertArgs} />);

storiesOf("Order", module)
  .add("Buy", () => (
    <Order type={TYPE_BUY} price={10000.99} amount={1.2345678} />
  ))
  .add("Sell", () => (
    <Order type={TYPE_SELL} price={10000.99} amount={1.2345678} />
  ));

storiesOf("OrderList", module).add("Default", () => (
  <OrderList
    orders={[
      {
        id: 1,
        type: TYPE_BUY,
        price: 10001.99,
        amount: 2.7654321,
        status: STATUS_PENDING
      },
      {
        id: 2,
        type: TYPE_BUY,
        price: 10000.99,
        amount: 1.2345678,
        status: STATUS_PENDING
      },
      {
        id: 3,
        type: TYPE_SELL,
        price: 9998.75,
        amount: 1.4567654,
        status: STATUS_PENDING
      },
      {
        id: 4,
        type: TYPE_SELL,
        price: 9997.89,
        amount: 4.776655,
        status: STATUS_PENDING
      }
    ]}
  />
));
