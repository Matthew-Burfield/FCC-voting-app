import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { RadialChart } from 'react-vis'

import '../../node_modules/react-vis/dist/style.css';


const getChartData = (data) => {
	if (data.findIndex(item => item.votes > 0) === -1) {
    return [{ angle: 1}]
  }
  return data.map(item => ({
    angle: item.votes,
    label: item.title,
  }))
}

class PieChart extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({ angle: PropTypes.number })),
    width: PropTypes.number,
    height: PropTypes.number,
  }
  constructor(props) {
    super(props)
    this.state = {
      data: [{angle: 0},{angle: 0},{angle: 0}]
    }
  }
  componentDidMount() {
    setTimeout((() => {
      this.setState({
        data: getChartData(this.props.data)
      })
    }).bind(this), 1000)
  }
  render() {
    return (
      <div
        className="App"
        style={{
          width: this.props.width,
          height: this.props.height,
          margin: '0 auto',
        }}
      >
        <RadialChart
          animation
					data={ this.state.data }
					width={ this.props.width }
					height={ this.props.height }
				/>
      </div>
    );
  }
}

export default PieChart;