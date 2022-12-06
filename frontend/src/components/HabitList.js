import Habit from "./Habit";
import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";

const HabitList = ({ type }) => {
  const {habits, setHabits} = useContext(Context);
  const [input, setInput] = useState("");

  const habitExists = (name) => {
    habits.forEach((habit) => {
      if (habit.name === name) return true;
    })
    return false;
  }
  const addHabit = (e) => {
    e.preventDefault();
    if (input === "" || habitExists(input)) return;
    fetch('http://localhost:5000/habits/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: input, type: type }),
    })
      .then((response) => response.json())
      .then((data) => {
        let newHabits = [...habits];
        newHabits.push(data);
        setHabits(newHabits);
        setInput("");
        console.log('Success:', data);
      })
  };

  const deleteHabit = (habit) => {
    // DB-TODO
    let newHabits = habits.filter((h) => h !== habit);
    setHabits(newHabits);
  };

  return (
    <div>
      {habits.filter((x) => x.type === type ).map((x) => 
        <Habit habit={x} deleteHabit={deleteHabit} type={type} />
      )}
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
