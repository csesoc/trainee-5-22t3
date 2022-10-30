import HabitList from "./HabitList"
import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";

const SideMenu = () => {
  const [doHabits, setDoHabits] = useState([]);
  const [dontHabits, setDontHabits] = useState([]);
  const {
    selectedDate,
    setSelectedDate
  } = useContext(Context);

  useEffect(() => {
    setDoHabits(["make bed", "drink water", "study"]);
  }, []);

  useEffect(() => {
    setDontHabits(["tiktok", "sleep late", "nap"]);
  }, []);

  const handleClick = () => {
    console.log(selectedDate);
  }

  return (
    <div className='bg-[#201D26] inline-block w-1/4 rounded-3xl text-[#B7B1C7] p-[10px] items-center'>
      {selectedDate !== null ? selectedDate.toDateString() : (new Date).toDateString()}
      <div>
        Do
        <HabitList list={doHabits} />
      </div>
      <div>
        Don't Do
        <HabitList list={dontHabits} />
      </div>
    </div>
  )
}

export default SideMenu;
