import React from 'react'
import { heatmapCellStates } from './consts';
import { useRef } from 'react';

function roundNearest100(num) {
  return Math.round(num / 100) * 100;
}

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd 
         ].join('/');
};

const getcolor = (value) => {
  let color;
  switch (roundNearest100(value)) {
    case 1000: color = 'bg-theme-pinkblue-1000'; break;
    case 900: color = 'bg-theme-pinkblue-900'; break;
    case 800: color = 'bg-theme-pinkblue-800'; break;
    case 700: color = 'bg-theme-pinkblue-700'; break;
    case 600: color = 'bg-theme-pinkblue-600'; break;
    case 500: color = 'bg-theme-pinkblue-500'; break;
    case 400: color = 'bg-theme-pinkblue-400'; break;
    case 300: color = 'bg-theme-pinkblue-300'; break;
    case 200: color = 'bg-theme-pinkblue-200'; break;
    case 100: color = 'bg-theme-pinkblue-100'; break;
    case 0: color = 'bg-theme-pinkblue-0'; break;
    default: color = 'bg-gray-500'
  }
  return color;
}

const HeatmapCell = ({value, state, info}) => {
  const ref = useRef();
  let color = getcolor(value);

  const getTooltip = () => {
    return (<span class={`absolute z-50 hidden px-6 py-2 mt-[150px] md:w-[1000%] 2xl:w-[800%] lg:w-[1200%] sm:w-[2500%] text-center text-slate-200 bg-gray-700 border border-gray-500  rounded tooltip-text group-hover:block`}>
      {info.date.yyyymmdd()}<br/> 
      Note: {info.note}
    </span>)
  }
  
  if (state === heatmapCellStates.isDimmed) return (
    <div className='group container flex relative w-[100%] justify-center 
    items-center'>
      <div className={`rounded-xl pb-[80%] w-[80%] m-auto relative bg-slate-700`}/>
    </div>
  ) 
  if (state === heatmapCellStates.isHighlighted) return (
    <div className='group container flex relative w-[100%] justify-center 
    items-center'>
      <div ref={ref} className={`xl:rounded-xl lg:rounded-lg md:rounded-md sm:rounded-sm pb-[100%] w-[100%] m-auto relative ${color}`}/>
      <div className={`xl:rounded-xl lg:rounded-lg md:rounded-md pb-[100%] w-[100%] m-auto absolute -inset-1 blur opacity-60 ${color}
        hover:opacity-90 transition duration-500 `} 
      />
      {getTooltip()}
    </div>
  );

  return (
    <div className='group container flex relative w-[100%] justify-center 
    items-center'>
      <div ref={ref} className={`rounded-xl pb-[100%] w-[100%] m-auto relative ${color}`}/>
      <div className={`xl:rounded-xl lg:rounded-lg md:rounded-md sm:rounded-sm pb-[110%] w-[110%] m-auto absolute -inset-1 opacity-0 
        hover:opacity-100  ${color} hover:blur
        transition duration-200`} 
      />
      {getTooltip()}
    </div>
  )
}

export default HeatmapCell