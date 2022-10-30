import React, { createContext, useState } from "react";
import { heatmapCellStates } from "./components/consts";

export const Context = createContext({
  cellsData: [],
  setCellsData: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
});

const ContextProvider = ({ children }) => {
  const [cellsData, setCellsData] = useState(heatmapCellStates.loading);
  const [selectedDate, setSelectedDate] = useState(null);

  const initialContext = {
    cellsData,
    setCellsData,
    selectedDate,
    setSelectedDate,
  };

  return <Context.Provider value={initialContext}>{children}</Context.Provider>;
};

export default ContextProvider;
