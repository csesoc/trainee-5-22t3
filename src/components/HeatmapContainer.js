import React, { useEffect, useState } from 'react'
import HeatmapCell from './HeatmapCell'

const HeatmapContainer = ({data, highlightProperty}) => {
  const cells = [];
  const generateCells = () => {
    Array(data.length).fill(1)
      .map((ie, i) => cells.push({info: data[i], cell: <HeatmapCell key={Math.random()*1000000} value={data[i].value} info={data[i]}/>})
    );
  }

  generateCells();

  if (highlightProperty != null) {
    cells.map((x, i) => {
      if (!x.info.wins.includes(highlightProperty) && !x.info.losses.includes(highlightProperty)) 
        x.cell =  <HeatmapCell key={Math.random()*1000000} value={cells[i].info.value} isDimmed={true} info={x.info}/>
      else x.cell = <HeatmapCell key={Math.random()*1000000} value={cells[i].info.value} isHighlighted={true} info={x.info}/>
    });
  }

  return(
    <div className="grid grid-cols-24 xl:grid-cols-22 md:grid-cols-16 sm:grid-cols-12 lg:grid-cols-20 2xl:grid-cols-30 gap-8 p-4 max-w-full" style={{
            backgroundColor: `rgba(10, 10, 20)`
        }}>
      {cells.map(x => x.cell)}
    </div>
  );
}
  
export default HeatmapContainer;
