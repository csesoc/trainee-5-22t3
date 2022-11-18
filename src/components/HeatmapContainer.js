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
  console.log(highlightProperties);

  // Handle null input first (i.e. data is stil loading)
  let cells = [];

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
    cells.forEach((x) =>
      !x.info.wins.some(x => highlightProperties.includes(x)) &&
      !x.info.losses.some(x => highlightProperties.includes(x))
        ? (x.state = heatmapCellStates.isDimmed)
        : (x.state = heatmapCellStates.isHighlighted)
    );
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
    >
      {cellsToRender.map(({ key, value, state, info }) => (
        <HeatmapCell key={key} value={value} state={state} info={info} />
      ))}
    </div>
  );
};

export default HeatmapContainer;
