import React from 'react'

function roundNearest100(num) {
  return Math.round(num / 100) * 100;
}

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
  }
  return color;
}

const HeatmapCell = (x) => {
  let color = getcolor(x.value);
  
  return (
    <div className='container relative w-[100%]'>
      <div className={`rounded-xl pb-[100%] w-[100%] m-auto relative ${color}`}/>
      <div className={`rounded-xl pb-[110%] w-[110%] m-auto absolute -inset-1 opacity-0 
        hover:opacity-100  ${color} hover:blur
        transition duration-200`}
      />
    </div>
  )
}

export default HeatmapCell