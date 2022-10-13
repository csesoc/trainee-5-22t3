import React from 'react'
import HeatmapCell from './HeatmapCell'

let cells = [{}]

const HeatmapContainer = ({data}) => {
  const generateCells = (numCells, values) => {
    return Array(numCells).fill(1)
      .map((ie, i) => cells.push({key: i, cell: <HeatmapCell key={Math.random()*1000000} value={values[i]}/>}));
  }

  generateCells(data.length, data.map(x => x.value));  

  return (
    <div className="grid grid-cols-20 gap-4 p-4 max-w-full content-center w-3/4" 
         >
      {cells.map(x => x.cell)}
    </div>
  )
}

export default HeatmapContainer