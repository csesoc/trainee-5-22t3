import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";

const Habit = ({ name, deleteHabit, type, id }) => {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const {
    selectedDate,
    cellsData,
    highlightHabit,
    addHighlightHabit,
    removeHighlightHabit,
    checkHabits,
    uncheckHabits,
    updateCellsDataValue,
  } = useContext(Context);

  let cellId =
    cellsData === null
      ? -2
      : cellsData.find(
        (x) =>
          new Date(selectedDate.toString()).getDate() ===
          new Date(x.date).getDate() &&
          new Date(selectedDate.toString()).getMonth() ===
          new Date(x.date).getMonth() &&
          new Date(selectedDate.toString()).getFullYear() ===
          new Date(x.date).getFullYear()
      )._id;

  useEffect(() => {
    if (cellId === -2) {
      setChecked(false);
    } else {
      setChecked(cellsData.find((x) => x._id === cellId)[type].includes(id));
    }
  }, [selectedDate]);

  useEffect(() => {
    setText(name);
  }, [])

  const handleCheck = async () => {
    setChecked(!checked);
    await checkHabits(cellId, id, type);

    const value = updateCellsDataValue(cellId);

    const obj = {
      id: cellId,
      cellDate: new Date(selectedDate),
      wins: [],
      losses: [],
      value: value,
    };

    obj[type].push(id);
    console.log(obj)

    await fetch("http://localhost:5000/dailydata/habit/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  };

  const handleUncheck = async () => {
    setChecked(!checked);
    await uncheckHabits(cellId, id, type);

    const value = updateCellsDataValue(cellId);

    const obj = {
      id: cellId,
      cellDate: new Date(selectedDate),
      wins: [],
      losses: [],
      value: value,
    };

    console.log("uncheck")

    obj[type].push(id);
    console.log(obj)

    await fetch("http://localhost:5000/dailydata/habit/uncheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  };

  const getSvg = (includesText) => {
    if (!includesText)
      return (
        <button className="pr-[20px]" onClick={() => addHighlightHabit(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </button>
      );
    else
      return (
        <button
          className="pr-[20px]"
          onClick={() => removeHighlightHabit(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="hotpink"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      );
  };

  return (
    <label className="flex justify-end">
      <div className="pl-[20px] inline-block mr-auto">
        <input
          type="checkbox"
          className="rounded text-pink-400 mr-3 mb-1"
          onChange={(e) => (e.target.checked ? handleCheck() : handleUncheck())}
          checked={checked}
        />
        {text}
      </div>
      <button className="" onClick={() => deleteHabit(id)}>
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
      {getSvg(highlightHabit.includes(id))}
    </label>
  );
};

export default Habit;
