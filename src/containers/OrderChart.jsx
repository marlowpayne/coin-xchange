import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Chart from 'chart.js'
import Immutable from 'immutable'

import { STATUS_FILLED } from '../constants'

// Bootstrap the candlestick CommonJS module
require('chartjs-chart-financial')

const Wrapper = styled.div`
  width: 50vw;
  height: 70vw;
`

class Visual extends React.Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  }

  getMassagedFilledOrders = () => {
    const { orders } = this.props

    const filledOrders = orders
      .filter(order => order.status === STATUS_FILLED)
      .sort((orderA, orderB) => orderB.lastModified - orderA.lastModified)
    let ordersByTimestamp = Immutable.Map()
    // Load up a Map of timestamp to order price
    filledOrders.forEach(order => {
      const ts = order.lastModified
      if (ordersByTimestamp.has(ts)) {
        const priceArr = ordersByTimestamp.get(ts)
        priceArr.push(order.price)
        ordersByTimestamp = ordersByTimestamp.set(ts, priceArr)
      } else {
        ordersByTimestamp = ordersByTimestamp.set(ts, [])
      }
    })
    const mappedPrices = ordersByTimestamp.map((priceArr, ts) => ({ t: ts, h: Math.max(...priceArr), l: Math.min(...priceArr) }))
    // console.log(mappedPrices.toArray())
    /*
    {
      o: open,
		  h: high,
		  l: low,
		  c: close,
      t: timestamp
	  }
    */
    // const massagedFilledOrders = filledOrders.map(order => ({ t: order.lastModified, y: order.price }))

    return mappedPrices.toArray()
  }

  getMassagedData = () => {
    const massagedFilledOrders = this.getMassagedFilledOrders()
    // Massage data to match chart.js requirements
    return {
      datasets: [{
        label: 'Filled Orders',
        data: massagedFilledOrders,
        options: {
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }]
          }
        },
      }]
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      chart: null,
    }
  }

  componentDidMount() {
    const chartCanvas = this.refs.chart

    const myChart = new Chart(chartCanvas, {
      type: 'candlestick',
      data: this.getMassagedData(),
    })

    this.setState({ chart: myChart })
  }

  componentDidUpdate() {
    const { chart } = this.state
    const data = this.getMassagedData()

    data.datasets.forEach((dataset, i) => chart.data.datasets[i].data = dataset.data)

    chart.update();
  }

  render() {
    return (
      <Wrapper>
        <canvas ref="chart"></canvas>
      </Wrapper>
    )
  }
}

const mapStateToProps = storeState => ({
  orders: storeState.orders.ordersMap.toArray(),
  count: storeState.orders.orderCount,
})

export const OrderChart = connect(mapStateToProps)(Visual)
