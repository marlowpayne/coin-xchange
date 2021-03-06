import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

// Material UI comps
import ListSubheader from "@material-ui/core/ListSubheader";

import { TYPE_SELL, STATUS_PENDING } from "../constants";
import { OrderList } from "../visuals/OrderList";
import { media } from "../utils";

const Wrapper = styled.div`
  width: 20vw;
  ${media.laptop`width: 80vw;`}
  padding: 1vw;
  ${media.laptop`height: 30vh;`}
  ${media.laptop`overflow-y: auto;`}
`;

const Visual = ({ orders }) => {
  const sellOrders = orders
    .filter(order => order.status === STATUS_PENDING)
    .filter(order => order.type === TYPE_SELL)
    .sort((orderA, orderB) => orderA.price - orderB.price);

  return (
    <Wrapper>
      <ListSubheader>Sell Orders</ListSubheader>
      <OrderList orders={sellOrders} />
    </Wrapper>
  );
};

const mapStateToProps = storeState => ({
  orders: storeState.orders.ordersMap.toArray(),
  count: storeState.orders.orderCount
});

export const PendingSellOrders = connect(mapStateToProps)(Visual);
