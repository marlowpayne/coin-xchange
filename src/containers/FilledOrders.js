import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

// Material UI comps
import ListSubheader from "@material-ui/core/ListSubheader";

import { STATUS_FILLED } from "../constants";
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
  const filledOrders = orders
    .filter(order => order.status === STATUS_FILLED)
    .sort((orderA, orderB) => orderB.lastModified - orderA.lastModified);

  return (
    <Wrapper>
      <ListSubheader>Filled Orders</ListSubheader>
      <OrderList orders={filledOrders} />
    </Wrapper>
  );
};

const mapStateToProps = storeState => ({
  orders: storeState.orders.ordersMap.toArray(),
  count: storeState.orders.orderCount
});

export const FilledOrders = connect(mapStateToProps)(Visual);
