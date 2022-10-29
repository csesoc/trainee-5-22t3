import React, { useEffect, useState } from "react";
import {
  HeatmapCellSize,
  heatmapCellStates,
  HeatmapContainerGap,
  HeatmapContainerGapCSS,
  HeatmapContainerMaxCells,
} from "./consts";
import HeatmapCell from "./HeatmapCell";

const HeatmapContainer = ({
  data,
  highlightProperties,
  isPropertiesHighlighted,
  height,
  width,
}) => {
  // Handle null input first (i.e. data is stil loading)
  const cells = [];

  data === null
    ? Array(HeatmapContainerMaxCells)
        .fill(1)
        .map((ie, i) =>
          cells.push({
            key: Math.random() * 1000000,
            value: 0,
            state: heatmapCellStates.loading,
            info: null,
          })
        )
    : Array(data.length)
        .fill(1)
        .map((ie, i) =>
          cells.push({
            key: Math.random() * 1000000,
            value: data[i].value,
            state: heatmapCellStates.default,
            info: data[i],
          })
        );

  if (isPropertiesHighlighted && data !== heatmapCellStates.loading) {
    for (const highlightProperty of highlightProperties) {
      cells.map((x) =>
        cells.map((x, i) => {
          !x.info.wins.includes(highlightProperty) &&
          !x.info.losses.includes(highlightProperty)
            ? (x.state = heatmapCellStates.isDimmed)
            : (x.state = heatmapCellStates.isHighlighted);
        })
      );
    }
  }

  const numCols = Math.floor(
    (width + HeatmapContainerGap) / (HeatmapCellSize + HeatmapContainerGap)
  );
  const numRows = Math.floor(
    (height + HeatmapContainerGap) / (HeatmapCellSize + HeatmapContainerGap)
  );
  const cellsToRender = cells.slice(-numRows * numCols);

  return (
    <div
      className={`grid ${
        "grid-cols-" + numCols
      } ${HeatmapContainerGapCSS} p-4 max-w-full`}
      style={{
        backgroundColor: `rgba(10, 10, 20)`,
      }}
    >
      {cellsToRender.map(({ key, value, state, info }) => (
        <HeatmapCell key={key} value={value} state={state} info={info} />
      ))}
    </div>
  );
};

export default HeatmapContainer;
