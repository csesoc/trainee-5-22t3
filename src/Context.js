import React, { createContext, useState } from "react";
import { heatmapCellStates } from "./components/consts";

export const Context = createContext({
  cellsData: [],
  setCellsData: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
  winHabits: [],
  setWinHabits: () => {},
  lossHabits: [],
  setLossHabits: () => {},
});

const ContextProvider = ({ children }) => {
  const [cellsData, setCellsData] = useState(heatmapCellStates.loading);
  const [selectedDate, setSelectedDate] = useState(null);
  const [winHabits, setWinHabits] = useState([]);
  const [lossHabits, setLossHabits] = useState([]);

  const initialContext = {
    cellsData,
    setCellsData,
    selectedDate,
    setSelectedDate,
    winHabits,
    setWinHabits,
    lossHabits,
    setLossHabits
  };

  return <Context.Provider value={initialContext}>{children}</Context.Provider>;
};

export default ContextProvider;
