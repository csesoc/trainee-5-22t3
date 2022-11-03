import Habit from "./Habit";
import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";

const HabitList = ({ type }) => {
  const [habits, setHabits] = useState([]);
  const [input, setInput] = useState("");
  const { winHabits, lossHabits } = useContext(Context);

  useEffect(() => {
    setHabits(type === "win" ? winHabits : lossHabits);
  }, [winHabits, lossHabits, type]);
  
  const addHabit = (e) => {
    e.preventDefault();
    let newHabits = [...habits];
    newHabits.push(input);
    setHabits(newHabits);
  }

  const deleteHabit = (habit) => {
    let newHabits = habits.filter(h => h !== habit);
    setHabits(newHabits);
  }

  return (
    <div>
      {habits.map((x) => <Habit habit={x} deleteHabit={deleteHabit} type={type}/>)}
      <form onSubmit={addHabit}>
        <input type="text" className="rounded w-[175px] m-2" onChange={e => setInput(e.target.value)}/>
        <button className="bg-pink-400 text-[#201D26] px-[8px] pb-[3px] rounded-2xl">+</button>
      </form>
    </div>
  );
};

export default HabitList;
