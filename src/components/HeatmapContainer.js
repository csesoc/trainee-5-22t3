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
    <div className="grid grid-cols-30 gap-8 p-4 max-w-full" 
         style={{
            backgroundColor: `rgba(10, 10, 20)`
          }}>
      {cells.map(x => x.cell)}
    </div>
  )
}

export default HeatmapContainer