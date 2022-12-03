import Habit from "./Habit";
import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";

const HabitList = ({ type }) => {
  const [habits, setHabits] = useState([]);
  const [input, setInput] = useState("");
  const { winHabits, lossHabits } = useContext(Context);

  useEffect(() => {
    setHabits(type === "wins" ? winHabits : lossHabits);
  }, [winHabits, lossHabits, type]);

  const addHabit = (e) => {
    // DB-TODO
    e.preventDefault();
    if (input === "" || habits.includes(input)) return;
    let newHabits = [...habits];
    newHabits.push(input);
    setHabits(newHabits);
    setInput("");
  };

  const deleteHabit = (habit) => {
    // DB-TODO
    let newHabits = habits.filter((h) => h !== habit);
    setHabits(newHabits);
  };

  return (
    <div>
      {habits.map((x) => (
        <Habit habit={x} deleteHabit={deleteHabit} type={type} />
      ))}
      <form onSubmit={addHabit}>
        <input
          type="text"
          id="add"
          className="rounded w-[175px] m-2 bg-[#242831] border border-[#363b47] text-[#B7B1C7]"
          placeholder="add habit"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-pink-400 text-[#201D26] px-[8px] pb-[3px] rounded-2xl active:bg-pink-500 active:shadow-lg transition duration-150 ease-in-out">
          +
        </button>
      </form>
    </div>
  );
};

export default HabitList;
