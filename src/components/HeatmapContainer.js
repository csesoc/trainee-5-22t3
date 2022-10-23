import React, { useEffect, useState } from "react";
import { HeatmapCellSize, heatmapCellStates, HeatmapContainerGap, HeatmapContainerGapCSS } from "./consts";
import HeatmapCell from "./HeatmapCell";

const getColsCSS = (value) => {
  let colsCSS;
  switch (value) {
    case 8: colsCSS = "grid-cols-8"; break;
    case 9: colsCSS = "grid-cols-9"; break;
    case 10: colsCSS = "grid-cols-10"; break;
    case 11: colsCSS = "grid-cols-11"; break;
    case 12: colsCSS = "grid-cols-12"; break;
    case 13: colsCSS = "grid-cols-13"; break;
    case 14: colsCSS = "grid-cols-14"; break;
    case 15: colsCSS = "grid-cols-15"; break;
    case 16: colsCSS = "grid-cols-16"; break;
    case 17: colsCSS = "grid-cols-17"; break;
    case 18: colsCSS = "grid-cols-18"; break;
    case 19: colsCSS = "grid-cols-19"; break;
    case 20: colsCSS = "grid-cols-20"; break;
    case 21: colsCSS = "grid-cols-21"; break;
    case 22: colsCSS = "grid-cols-22"; break;
    case 23: colsCSS = "grid-cols-23"; break;
    case 24: colsCSS = "grid-cols-24"; break;
    case 25: colsCSS = "grid-cols-25"; break;
    case 26: colsCSS = "grid-cols-26"; break;
    case 27: colsCSS = "grid-cols-27"; break;
    case 28: colsCSS = "grid-cols-28"; break;
    case 29: colsCSS = "grid-cols-29"; break;
    case 30: colsCSS = "grid-cols-30"; break;
    case 31: colsCSS = "grid-cols-31"; break; 
    case 32: colsCSS = "grid-cols-32"; break;   
    case 33: colsCSS = "grid-cols-33"; break; 
    case 34: colsCSS = "grid-cols-34"; break; 
    case 35: colsCSS = "grid-cols-35"; break; 
    case 36: colsCSS = "grid-cols-36"; break; 
    case 37: colsCSS = "grid-cols-37"; break; 
    case 38: colsCSS = "grid-cols-38"; break; 
    case 39: colsCSS = "grid-cols-39"; break; 
    case 40: colsCSS = "grid-cols-40"; break; 
  }
  return colsCSS;
}

const HeatmapContainer = ({
  data,
  highlightProperties,
  isPropertiesHighlighted,
  height,
  width,
}) => {
  const cells = [];
  Array(data.length)
    .fill(1)
    .map((ie, i) =>
      cells.push({
        info: data[i],
        cell: (
          <HeatmapCell
            value={data[i].value}
            state={heatmapCellStates.default}
            info={data[i]}
          />
        ),
      })
    );

  if (isPropertiesHighlighted) {
    for (const highlightProperty of highlightProperties) {
      cells.map((x) =>
        cells.map((x, i) => {
          if (
            !x.info.wins.includes(highlightProperty) &&
            !x.info.losses.includes(highlightProperty)
          )
            x.cell = (
              <HeatmapCell
                key={Math.random() * 1000000}
                value={cells[i].info.value}
                state={heatmapCellStates.isDimmed}
                info={x.info}
              />
            );
          else
            x.cell = (
              <HeatmapCell
                key={Math.random() * 1000000}
                value={cells[i].info.value}
                state={heatmapCellStates.isHighlighted}
                info={x.info}
              />
            );
        })
      );
    }
  }

  const numCols = Math.floor((width + HeatmapContainerGap) / (HeatmapCellSize + HeatmapContainerGap));
  const numRows = Math.floor((height + HeatmapContainerGap) / (HeatmapCellSize + HeatmapContainerGap));
  const cellsToRender = cells.slice(- numRows * numCols);

  return (
    <div
      className={`grid ${getColsCSS(numCols)} ${HeatmapContainerGapCSS} p-4 max-w-full`}
      style={{
        backgroundColor: `rgba(10, 10, 20)`,
      }}
    >
      {cellsToRender.map((x) => x.cell)}
    </div>
  );
};

export default HeatmapContainer;
