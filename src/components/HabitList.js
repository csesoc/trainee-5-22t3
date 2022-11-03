import Habit from "./Habit";
import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";

const HabitList = ({ type }) => {
  const [habits, setHabits] = useState([]);
  const [input, setInput] = useState("");
  const { winHabits, setWinHabits, lossHabits, setLossHabits } = useContext(Context);

  useEffect(() => {
    setHabits(type === "win" ? winHabits : lossHabits);
  }, []);
  
  const addHabit = (e) => {
    e.preventDefault();
    let newHabits = [...habits];
    newHabits.push(input);
    setHabits(newHabits);
  }

  return (
    <div>
      {habits.map((x) => {
        return (
          <div className="flex p-3">
            <input
              type="checkbox"
              className="rounded"
              onChange={() => console.log(x)}
            />
            {x}
          </div>
        );
      })}
      <form onSubmit={addHabit}>
        <input type="text" id="name" name="name" className="rounded m-2" onChange={e => setInput(e.target.value)}/>
        <button>+</button>
      </form>
    </div>
  );
};

export default HabitList;
