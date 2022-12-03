import NavHeader from "../components/NavHeader";
import SideMenu from "../components/SideMenu";
import HeatmapContainer from "../components/HeatmapContainer";
import { useRef } from "react";
import { useContext, useEffect, useState, useLayoutEffect } from "react";
import { Context } from "../Context";

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const START_DATE = new Date();
/*
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
        .map((x) => Math.round(Math.random() * 20)),
      losses: Array(10)
        .fill(1)
        .map((x) => Math.round(Math.random() * 20)),
      value: Math.round(Math.random() * 1000),
    };
  });
*/
const dummyData = Array(100)
  .fill(1)
  .map((ie, i) => {
    let date = START_DATE;
    date = date.addDays(-i);
    return {
      date: date,
      index: i,
      note: "placeholder",
      wins: [],
      losses: [],
      value: -1,
    };
  }).reverse();

const MainPage = () => {
  const fetchData = () => {
    // DB-TODO, fetch and load data into context on initial render
    return dummyData;
  };

  const { cellsData, setCellsData, highlightHabit } = useContext(Context);

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
    setTimeout(() => {
      const res = fetchData();
      setCellsData(res);
    }, 1000); // wait so 2 seconds here

    // EXAMPLE FETCH, REMOVE WHEN YOU CAN
    fetch("http://localhost:5000/getCellsData")
      .then(response => response.json())
      .then(data => console.log(data))

    return () => {
      window.removeEventListener("resize", setHeatmapDimensions);
    };
  }, []);

  return (
    <div className="p-[20px] absolute h-[100%] w-[100%] bg-[#16181c]">
      <NavHeader />
      <div className="flex flex-row flex-1">
        <div ref={ref} className="h-full w-[80%]">
          <HeatmapContainer
            data={cellsData}
            highlightProperties={highlightHabit}
            isPropertiesHighlighted={highlightHabit.length === 0 ? false : true}
            height={height}
            width={width}
          />
        </div>
        <div className="w-[20%]">
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
