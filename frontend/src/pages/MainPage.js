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

const MainPage = () => {
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

    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/dailydata")
      const data = await response.json()
      data.forEach(element => {
        element.date = new Date(element.date)
      });

      console.log(data)
      let today = new Date();
      today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      let latest = new Date(Math.max(...data.map(x => x.date)));
      if (latest === -Infinity) {
        latest = new Date(today);
      } else {
        latest = new Date(latest.getFullYear(), latest.getMonth(), latest.getDate() + 1);
      }
      while (latest <= today) {
        console.log("adding " + new Date(latest));
        const id = await fetch('http://localhost:5000/dailydata/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date: new Date(latest), note: "", wins: [], losses: [], value: -1 }),
        })
        const newData = {
          _id: id,
          date: new Date(latest),
          note: "",
          wins: [],
          losses: [],
          value: -1,
        }
        data.push(newData);
        latest.setDate(latest.getDate() + 1)
      }
      setCellsData(data)
    }

    fetchData();
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
