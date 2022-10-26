import logo from "./logo.svg";
import "./App.css";
import HeatmapContainer from "./components/HeatmapContainer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const START_DATE = new Date("1/1/2022");
const dummyData = Array(200)
  .fill(1)
  .map((ie, i) => {
    let date = START_DATE;
    date = date.addDays(i);
    return {
      date: date,
      index: i,
      note: "placeholder",
      wins: Array(10)
        .fill(1)
        .map((x) => Math.round(Math.random() * 10)),
      losses: Array(10)
        .fill(1)
        .map((x) => Math.round(Math.random() * 10)),
      value: Math.round(Math.random() * 1000),
    };
  });

const fetchData = () => {
  return dummyData;
};

function App() {
  // Below exists as input for heatmap containers height and width not sure if this is the best solution
  const ref = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const setHeatmapDimensions = () => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  };

  useLayoutEffect(() => {
    setHeatmapDimensions();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setHeatmapDimensions);
    return () => {
      window.removeEventListener("resize", setHeatmapDimensions);
    };
  }, []);

  const data = fetchData();
  // Refreshes on every change
  useEffect(() => {
    const data = fetchData();
  }, []);

  return (
    <div className="App">
      <div ref={ref} className="h-full">
        <HeatmapContainer
          data={data}
          highlightProperties={Array(1).fill(1)}
          isPropertiesHighlighted={true}
          height={height}
          width={width}
        />
      </div>
    </div>
  );
}

export default App;
