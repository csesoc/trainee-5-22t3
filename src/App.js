import logo from './logo.svg';
import './App.css';
import HeatmapContainer from './components/HeatmapContainer';
import { useRef } from 'react';

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
const START_DATE = new Date('1/1/2022');
const data = Array(200).fill(1)
  .map((ie, i) => {
    let date = START_DATE;
    date = date.addDays(i);
    return {
      date: date,
      index: i,
      note: 'placeholder',
      wins: Array(10).fill(1).map(x => Math.round(Math.random()*10)),
      losses: Array(10).fill(1).map(x => Math.round(Math.random()*10)),
      value: Math.round(Math.random()*1000)
    };
  });

function App() {  
  return (
    <div className="App">
      <HeatmapContainer data={data} highlightProperty={null}/>
    </div>
  );
}

export default App;