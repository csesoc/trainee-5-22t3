import HabitList from "./HabitList"
import { useEffect, useState } from "react";

const SideMenu = () => {
  const [doHabits, setDoHabits] = useState([]);
  const [dontHabits, setDontHabits] = useState([]);


  useEffect(() => {
    setDoHabits(["make bed", "drink water", "study"]);
  }, []);

  useEffect(() => {
    setDontHabits(["tiktok", "sleep late", "nap"]);
  }, []);

  return (
    <div className='bg-[#201D26] inline-block w-1/4 rounded-3xl text-[#B7B1C7] p-[10px] items-center'>
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
