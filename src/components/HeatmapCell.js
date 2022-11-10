import React from "react";
import { heatmapCellStates } from "./consts";
import { useRef, useContext } from "react";
import { Context } from "../Context";

const restrict = (x, min, max) => {
  if (x >= min && x <= max) return x;
  if (x > max) return max;
  if (x < min) return min;
}

const roundNearest100 = (num) => {
  return restrict(Math.round(num / 100) * 100, 0, 1000);
};

const getTooltip = (info) => {
  return (
    <span
      className={`absolute z-50 hidden px-6 py-2 mt-[150px] md:w-[1000%] 2xl:w-[700%] lg:w-[850%] sm:w-[2500%] text-center text-slate-200 bg-gray-700 border border-gray-500  rounded tooltip-text group-hover:block`}
    >
      {info.date.yyyymmdd()}
      <br />
      Note: {info.note}
      <br />
      Value: {info.value}
    </span>
  );
};

const groupStyle =
  "group container flex relative w-[100%] justify-center items-center";
const cellBaseStyle = (state, color) => {
  return `rounded-xl pb-[100%] w-[100%] m-auto relative ${
    state === heatmapCellStates.loading ? "bg-slate-900" : color
  }`;
};

const baseGlowStyle = (state) => {
  return `rounded-xl m-auto absolute -inset-${
    state === heatmapCellStates.loading ? +"0" : "1"
  }`;
};

const getStyle = (state, color) => {
  if (state === heatmapCellStates.isDimmed) {
    return "rounded-xl pb-[80%] w-[80%] m-auto relative bg-slate-700";
  }

  if (state === heatmapCellStates.isHighlighted) {
    return `${baseGlowStyle(state)} blur opacity-60 ${color}
    hover:opacity-90 transition duration-500 pb-[100%] w-[100%]`;
  }

  if (state === heatmapCellStates.default) {
    return `${baseGlowStyle(state)} opacity-0 
    hover:opacity-100  ${color} hover:blur pb-[110%] w-[110%]
    transition duration-200`;
  }

  if (state === heatmapCellStates.loading) {
    return `${baseGlowStyle(
      state
    )} animate-pulse pb-[100%] w-[100%] bg-slate-700`;
  }
};

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("/");
};

const HeatmapCell = ({ value, state, info }) => {
  const ref = useRef();
  const { setSelectedDate } = useContext(Context);
  let color = "bg-theme-pinkblue-" + roundNearest100(value);

  const handleClick = () => {
    setSelectedDate(info.date);
  };

  return (
    <div className={`${groupStyle}`}>
      {state !== heatmapCellStates.isDimmed ? (
        <div ref={ref} className={`${cellBaseStyle(state, color)}`} />
      ) : null}
      <div onClick={handleClick} className={`${getStyle(state, color)}`} />
      {state !== heatmapCellStates.isDimmed &&
      state !== heatmapCellStates.loading
        ? getTooltip(info)
        : null}
    </div>
  );
};

export default HeatmapCell;
