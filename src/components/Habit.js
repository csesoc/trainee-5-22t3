import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";

const Habit = ({ habit, deleteHabit, type }) => {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const { selectedDate, cellsData, setCellsData } = useContext(Context);

  let index = cellsData.indexOf(
    cellsData.find(
      (x) =>
        x.date.getDate() === selectedDate.getDate() &&
        x.date.getMonth() === selectedDate.getMonth() &&
        x.date.getYear() === selectedDate.getYear()
    )
  );

  useEffect(() => {
    setText(habit);
  }, [habit]);

  const handleCheck = (e) => {
    let newCellsData = [...cellsData];
    setChecked(e.target.checked);

    if (type === "wins") {
      if (e.target.checked) {
        newCellsData[index].wins.push(text);
      } else {
        newCellsData[index].wins = newCellsData[index].wins.filter(
          (x) => x !== text
        );
      }
    } else {
      if (e.target.checked) {
        newCellsData[index].losses.push(text);
      } else {
        newCellsData[index].losses = newCellsData[index].wins.filter(
          (x) => x !== text
        );
      }
    }
    newCellsData[index].value =
      (0.5 +
        newCellsData[index].wins.length * 0.1 -
        0.1 * newCellsData[index].losses.length) *
      1000;
    setCellsData(newCellsData);
  };

  useEffect(() => {
    console.log(cellsData, index, selectedDate);
    setChecked(cellsData[index][type].includes(text));
  }, [selectedDate]);

  return (
    <label className="flex justify-between">
      <div className="gap-[10px] pl-[20px] inline-block">
        <input
          type="checkbox"
          className="rounded text-pink-400 mr-3 mb-1"
          onChange={handleCheck}
          checked={checked}
        />
        {text}
      </div>
      <button
        className="pr-[20px] inline-block"
        onClick={() => deleteHabit(habit)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </label>
  );
};

export default Habit;
