import React, { Component } from 'react'
import { RadialChart } from 'react-vis';

import '../../node_modules/react-vis/dist/style.css';


const getChartData = (data) => {
	if (data.length === 0) {
		return [{ key: '', value: 1}]
	}
	return data.map(item => ({ key: item.title, value: item.votes }))
}

class App extends Component {
  render() {
    const data = [
      {x: 0, y: 8},
      {x: 1, y: 5},
      {x: 2, y: 4},
      {x: 3, y: 9},
      {x: 4, y: 1},
      {x: 5, y: 7},
      {x: 6, y: 6},
      {x: 7, y: 3},
      {x: 8, y: 2},
      {x: 9, y: 0}
    ];
    return (
      <div className="App">
        <RadialChart
					data={data}
					width={300}
					height={300}
				/>
      </div>
    );
  }
}

export default App;