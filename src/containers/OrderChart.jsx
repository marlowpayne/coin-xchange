import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Chart from 'chart.js'
import moment from 'moment'
import _ from 'lodash'

import { NUMBER_SECONDS_CHART_GROUPING, STATUS_FILLED } from '../constants'
import { roundMoment } from '../utils'

// Bootstrap the candlestick CommonJS module
require('chartjs-chart-financial')

const Wrapper = styled.div`
  width: 40vw;
  height: 70vw;
  padding-top: 5vh;
`

class Visual extends React.Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  }

  getMassagedFilledOrders = () => {
    const { orders } = this.props

    // Get all filled orders from oldest to newest
    const filledOrders = orders
      .filter(order => order.status === STATUS_FILLED)
      .sort((orderA, orderB) => orderA.lastModified - orderB.lastModified)

    // Group filled orders into time buckets
    const groupedOrders = _.groupBy(filledOrders, order => roundMoment(
      moment(order.lastModified),
      moment.duration(NUMBER_SECONDS_CHART_GROUPING, 'seconds'),
      'floor',
    ))

    // Extract prices from orders in the buckets
    const pricesBySecond = _.mapValues(groupedOrders, order => _.map(order, 'price'))

    // Grab pricing data from price arrays
    const opensBySecond = _.mapValues(pricesBySecond, prices => _.head(prices))
    const closesBySecond = _.mapValues(pricesBySecond, prices => _.last(prices))
    const highsBySecond = _.mapValues(pricesBySecond, prices => Math.max(...prices))
    const lowsBySecond = _.mapValues(pricesBySecond, prices => Math.min(...prices))

    const res = _.map(groupedOrders, (order, ts) => {
      /* Expected candlestick data format:
      {
        o: open,
        c: close,
        h: high,
        l: low,
        t: timestamp
      }
      */
      return {
        o: opensBySecond[ts],
        c: closesBySecond[ts],
        h: highsBySecond[ts],
        l: lowsBySecond[ts],
        t: ts,
      }
    })

    return res
  }

  getMassagedData = () => {
    const massagedFilledOrders = this.getMassagedFilledOrders()

    // Massage data to match chart.js requirements
    return {
      datasets: [{
        label: 'Filled Orders',
        data: massagedFilledOrders,
      }],
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      chart: null,
    }
    // Set chart.js global options
    Chart.defaults.global.legend.display = false
  }

  componentDidMount() {
    const chartCanvas = this.refs.chart

    const myChart = new Chart(chartCanvas, {
      type: 'candlestick',
      data: this.getMassagedData(),
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: '$',
              fontColor: 'black',
            },
          }],
        },
      },
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
