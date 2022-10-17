import React, { useEffect, useState } from 'react'
import { heatmapCellStates } from './consts';
import HeatmapCell from './HeatmapCell'

const HeatmapContainer = ({data, highlightProperties, isPropertiesHighlighted}) => {
  const cells = [];
  const generateCells = () => {
    Array(data.length).fill(1)
      .map((ie, i) => cells.push({info: data[i], cell: <HeatmapCell value={data[i].value} state={heatmapCellStates.default}/>})
    );
  }

  generateCells();
  if (isPropertiesHighlighted) 
    for (const highlightProperty of highlightProperties) {
      cells.map((x) => cells.map((x, i) => {
        if (!x.info.wins.includes(highlightProperty) && !x.info.losses.includes(highlightProperty)) x.cell =  <HeatmapCell key={Math.random()*1000000} value={cells[i].info.value} state={heatmapCellStates.isDimmed} info={x.info}/>
        else x.cell = <HeatmapCell key={Math.random()*1000000} value={cells[i].info.value} state={heatmapCellStates.isHighlighted} info={x.info}/>
      }))
    }

  return (
    <div className="grid grid-cols-20 gap-4 p-4 max-w-full content-center w-3/4" 
         >
      {cells.map(x => x.cell)}
    </div>
  );
}
  
export default HeatmapContainer;
