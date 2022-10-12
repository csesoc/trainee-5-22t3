import './App.css';
import HeatmapContainer from './components/HeatmapContainer';
import { useRef } from 'react';

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
const START_DATE = new Date('1/1/2022');
const data = Array(90).fill(1)
  .map((ie, i) => {
    let date = START_DATE;
    date = date.addDays(i);
    return {
      date: date,
      index: i,
      note: 'placeholder',
      value: Math.round(Math.random()*1000)
    };
  });

function App() {
  return (
    <div className="App">
      <HeatmapContainer data={data}/>
    </div>
  );
}

export default App;