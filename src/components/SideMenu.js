import HabitList from "./HabitList";
import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";

const SideMenu = () => {
  const {
    selectedDate,
    setSelectedDate,
    winHabits,
    setWinHabits,
    lossHabits,
    setLossHabits,
  } = useContext(Context);

  const handleClick = () => {
    console.log(selectedDate);
  };

  return (
    <div className="bg-[#201D26] rounded-3xl text-[#B7B1C7] p-[10px] items-center m-3">
      {selectedDate !== null
        ? selectedDate.toDateString()
        : new Date().toDateString()}
      <div>
        Do
        <HabitList type={"win"} />
      </div>
      <div>
        Don't Do
        <HabitList type={"loss"} />
      </div>
    </div>
  );
};

export default SideMenu;
