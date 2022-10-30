import NavHeader from "../components/NavHeader";
import SideMenu from "../components/SideMenu";
import HeatmapContainer from '../components/HeatmapContainer';
import { useRef } from 'react';
import { useEffect, useState, useLayoutEffect } from "react";
import { heatmapCellStates } from "../components/consts"

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
const START_DATE = new Date('1/1/2022');
const dummyData = Array(200).fill(1)
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

const MainPage = () => {
  const fetchData = () => {
    return dummyData;
  };

  const [data, setData] = useState(heatmapCellStates.loading);
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
      setData(res);
    }, 4000); // wait so 2 seconds here
    return () => {
      window.removeEventListener("resize", setHeatmapDimensions);
    };
  }, []);

  return (
    <div className='p-[20px] relative h-screen w-screen bg-[#19181C]'>
      <div className='bg-slate-700 block h-[75px]'>
        <NavHeader/>
      </div>
      <div ref={ref} className="mt-[20px] mx-[50px] flex gap-[20px] items-stretch h-[556px]">
        <HeatmapContainer
          data={data}
          highlightProperties={Array(1).fill(1)}
          isPropertiesHighlighted={false}
          height={height}
          width={width}
        />
        <SideMenu/>
      </div>            
    </div>
  )
}

export default MainPage;
