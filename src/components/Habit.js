import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";

const Habit = ({ habit, deleteHabit, type }) => {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const { 
    selectedDate,
    cellsData,
    setCellsData
  } = useContext(Context);

  useEffect(() => {
    setText(habit);
  }, [habit]);

  const handleCheck = e => {
    let index = cellsData.indexOf(cellsData.find(x => x.date === selectedDate));
    let newCellsData = [...cellsData]
    
    if (type === "win") {
      if (e.target.checked) {
        setChecked(true);
        newCellsData[index].value += 200;
      } else {
        setChecked(false);
        newCellsData[index].value -= 200;
      }
    } else {
      if (e.target.checked) {
        setChecked(true);
        newCellsData[index].value -= 200;
      } else {
        setChecked(false);
        newCellsData[index].value += 200;
      }
    }
    setCellsData(newCellsData);
  }

  useEffect(() => {
    setChecked(false);
  }, [selectedDate])

  return (
    <div className="flex justify-between">
      <div className="flex gap-[10px] pl-[20px]">
        <input 
          type="checkbox" 
          className="rounded text-pink-400" 
          onChange={handleCheck} 
          checked={checked}
        />
        {text}
      </div>
      <div className="pr-[20px]">
        <button onClick={() => deleteHabit(habit)}>x</button>
      </div>
    </div>
  )
}

export default Habit;
