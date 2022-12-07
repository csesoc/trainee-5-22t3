import React, { createContext, useState } from "react";
import { heatmapCellStates } from "./components/consts";

export const Context = createContext({
  cellsData: [],
  setCellsData: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
  habits: [],
  setHabits: () => {},
  highlightHabit: [],
  addHighlightHabit: (habit) => {},
  removeHighlightHabit: (habit) => {},
  checkHabits: (id, habits, type) => {},
  uncheckHabits: (id, habits, type) => {},
  updateCellsDataValue: (id) => {},
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

  const checkHabits = (id, habits, type) => {
    setCellsData((c) => {
      let newCells = [...c];
      newCells.find((x) => x._id === id)[type].push(...habits);
      return newCells;
    });
  };

  const uncheckHabits = (id, habits, type) => {
    setCellsData((c) => {
      let newCells = [...c];
      let cell = newCells.find((x) => x._id === id);
      cell[type] = cell[type].filter((x) => !habits.includes(x));
      return newCells;
    });
  };

  const updateCellsDataValue = (id) => {
    const cell = cellsData.find((x) => x._id === id);
    const newCellsData = [...cellsData];
    newCellsData.find((x) => x._id === id).value =
      (0.5 + cell.wins.length * 0.1 - 0.1 * cell.losses.length) * 1000;
    setCellsData(newCellsData);
    return newCellsData.find((x) => x._id === id).value;
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
    checkHabits,
    uncheckHabits,
    updateCellsDataValue,
  };

  return <Context.Provider value={initialContext}>{children}</Context.Provider>;
};

export default ContextProvider;
