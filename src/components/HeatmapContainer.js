import React from 'react'
import HeatmapCell from './HeatmapCell'

let cells = [{}]

const HeatmapContainer = () => {
  const generateCells = (numCells) => {
    return Array(numCells).fill(1)
      .map((ie, i) => cells.push({key: i, cell: <HeatmapCell value={Math.floor(Math.random()*1000)}/>}));
  }

  generateCells(365);  

  return (
    <div className="grid grid-cols-26 gap-8 p-4 max-w-full" 
         style={{
            backgroundColor: `rgba(10, 10, 20)`
          }}>
      {cells.map(x => x.cell)}
    </div>
  )
}

export default HeatmapContainer