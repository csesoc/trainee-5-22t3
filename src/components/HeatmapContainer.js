import React from 'react'
import HeatmapCell from './HeatmapCell'

class HeatmapContainer extends React.Component{
  constructor(data) {
    super();
    this.state = {data: data, cells: []};
    this.generateCells(data.length, data.map(x => x.value));
  }

  /**
   * used for intital generation of cells
   * @param {int} numCells 
   * @param {int} values 
   * @returns 
   */
  generateCells(numCells, values) {
    const { cells, data } = this.state;
    return Array(numCells).fill(1)
      .map((ie, i) => cells.push({info: data[i], cell: <HeatmapCell key={Math.random()*1000000} value={values[i]}/>})
    );
  }
  
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
      <div className="grid grid-cols-30 gap-8 p-4 max-w-full" 
           style={{
              backgroundColor: `rgba(10, 10, 20)`
            }}>
        {cells.map(x => x.cell)}
      </div>
    )
  }
}

export default HeatmapContainer