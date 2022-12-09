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
  addHighlightHabit: (habitId) => { },
  removeHighlightHabit: (habitId) => { },
  checkHabits: (id, habitId, type) => { },
  uncheckHabits: (id, habitId, type) => { },
  updateCellsDataValue: (id) => { },
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

  const addHighlightHabit = (habitId) => {
    setHighlightHabit((h) => {
      let newList = [...h];
      newList.push(habitId);
      return newList;
    });
  };

  const removeHighlightHabit = (habitId) => {
    setHighlightHabit((h) => {
      let newList = [...h];
      newList = newList.filter((x) => x !== habitId);
      return newList;
    });
  };

  const checkHabits = (id, habitId, type) => {
    setHabits((h) => {
      let newHabits = [...h];
      let habit = newHabits.find((x) => x._id === habitId);
      habit.dates.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()))
      return newHabits;
    });

    setCellsData((c) => {
      let newCells = [...c];
      newCells.find((x) => x._id === id)[type].push(habitId);
      return newCells;
    });
  };

  const uncheckHabits = (id, habitId, type) => {
    setHabits((h) => {
      let newHabits = [...h];
      let habit = newHabits.find((x) => x._id === habitId);
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
      habit.dates = habit.dates.filter(x => x.date !== date);
      return newHabits;
    });

    setCellsData((c) => {
      let newCells = [...c];
      let cell = newCells.find((x) => x._id === id);
      console.log(type)
      cell[type] = cell[type].filter((x) => x !== habitId);
      return newCells;
    });
  };

  const updateCellsDataValue = (id) => {
    const cell = cellsData.find((x) => x._id === id);
    console.log(cell.losses, cell.losses.length);
    const newCellsData = [...cellsData];
    newCellsData.find((x) => x._id === id).value =
      (0.5 + (cell.wins.length * 0.1) - (cell.losses.length * 0.1)) * 1000;
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
