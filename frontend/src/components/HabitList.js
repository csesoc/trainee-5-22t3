import Habit from "./Habit";
import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";

const HabitList = ({ type }) => {
  const { habits, setHabits } = useContext(Context);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/habits");
      const habits = await res.json();
      setHabits(habits)
    };

    fetchData();
  }, []);

  const habitExists = (name) => {
    habits.forEach((habit) => {
      if (habit.name === name) return true;
    });
    return false;
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (input === "" || habitExists(input)) return;
    fetch("http://localhost:5000/habits/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: input, type: type }),
    })
      .then((response) => response.json())
      .then((data) => {
        let newHabits = [...habits];
        newHabits.push(data);
        setHabits(newHabits);
        setInput("");
        console.log("Success:", data);
      });
  };

  const deleteHabit = (id) => {
    fetch(`http://localhost:5000/habits/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        let newHabits = habits.filter((h) => h._id !== id);
        setHabits(newHabits);
        console.log("Success:", data);
      });
  };

  return (
    <div>
      {habits
        .filter((x) => x.type === type)
        .map((x) => (
          <Habit
            key={x._id}
            name={x.name}
            deleteHabit={deleteHabit}
            type={x.type}
            id={x._id}
          />
        ))}
      <form onSubmit={addHabit}>
        <input
          type="text"
          id="add"
          className="rounded w-[75%] m-2 bg-[#242831] border border-[#363b47] text-[#B7B1C7]"
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
