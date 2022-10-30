import Habit from "./Habit"
import { useEffect, useState } from "react";

const HabitList = ({ list }) => {
  const [habits, setHabits] = useState([]);


  useEffect(() => {
    setHabits(list);
  }, []);

  const handleClick = () => {
    
  }

  return (
    <div>
      {habits.map(x => <Habit habit={x}/>)}
      <button onClick={handleClick}>+</button>
    </div>
  )
}
  
export default HabitList;