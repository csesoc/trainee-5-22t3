import React, { useEffect, useState } from 'react'
import HeatmapCell from './HeatmapCell'

const HeatmapContainer = ({data, highlightProperty}) => {
  const cells = [];
  const generateCells = () => {
    Array(data.length).fill(1)
      .map((ie, i) => cells.push({info: data[i], cell: <HeatmapCell key={Math.random()*1000000} value={data[i].value}/>})
    );
  }

  generateCells();

  if (highlightProperty != null) {
    cells.map((x, i) => {
      if (!x.info.wins.includes(highlightProperty) && ! x.info.losses.includes(highlightProperty)) x.cell =  <HeatmapCell key={Math.random()*1000000} value={cells[i].info.value} isDimmed={true}/>
      else x.cell = <HeatmapCell key={Math.random()*1000000} value={cells[i].info.value} isHighlighted={true}/>
    });
  }

  return(
    <div className="grid grid-cols-24 gap-8 p-4 max-w-full" style={{
            backgroundColor: `rgba(10, 10, 20)`
        }}>
      {cells.map(x => x.cell)}
    </div>
  );
}
  
  /*
  renderHighlightPropertyWin(property) {
    const { cells } = this.state;
    cells.map((x, i) => {
      if (!x.info.wins.includes(property)) x.cell =  <HeatmapCell key={Math.random()*1000000} value={cells[i].info.value} isDimmed={true}/>
      else x.cell = <HeatmapCell key={Math.random()*1000000} value={cells[i].info.value} isHighlighted={true}/>
    });
    return this.render();
  }

  renderHighlightPropertyLoss(property) {
    const { cells } = this.state;
    cells.map((x, i) => {
      if (!x.info.losses.includes(property)) x.cell =  <HeatmapCell key={Math.random()*1000000} value={cells[i].info.value} isDimmed={true}/>
      else x.cell = <HeatmapCell key={Math.random()*1000000} value={cells[i].info.value} isHighlighted={true}/>
    });
    return this.render();
  }

  renderDefault() {
    return this.render();
  }

  render() {
    const { cells } = this.state;
    return (
      <div className="grid grid-cols-24 gap-8 p-4 max-w-full" 
           style={{
              backgroundColor: `rgba(10, 10, 20)`
            }}>
        {cells.map(x => x.cell)}
      </div>
    )
  }
}
*/

export default HeatmapContainer;