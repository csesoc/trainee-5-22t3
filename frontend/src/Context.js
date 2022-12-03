import React, { createContext, useState } from "react";
import { heatmapCellStates } from "./components/consts";

export const Context = createContext({
  cellsData: [],
  setCellsData: () => { },
  selectedDate: null,
  setSelectedDate: () => { },
  habits: [],
  setHabits: () => { },
  highlightHabit: [],
  addHighlightHabit: (habit) => { },
  removeHighlightHabit: (habit) => { },
});

const ContextProvider = ({ children }) => {
  const [cellsData, setCellsData] = useState(heatmapCellStates.loading);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState([]);
  const [highlightHabit, setHighlightHabit] = useState([]);



  // const adjustHabitValue = (newValue) => {
  //   fetch('localhost:5000/updateCellValue')
  //   // update locally on success
  // }

  const addHighlightHabit = (habit) => {
    setHighlightHabit((h) => {
      let newList = [...h];
      newList.push(habit);
      return newList;
    });
  };

  const removeHighlightHabit = (habit) => {
    setHighlightHabit((h) => {
      let newList = [...h];
      newList = newList.filter((x) => x !== habit);
      return newList;
    });
  };

  const initialContext = {
    cellsData,
    setCellsData,
    selectedDate,
    setSelectedDate,
    habits,
    setHabits,
    highlightHabit,
    addHighlightHabit,
    removeHighlightHabit,
  };

  return <Context.Provider value={initialContext}>{children}</Context.Provider>;
};

export default ContextProvider;
