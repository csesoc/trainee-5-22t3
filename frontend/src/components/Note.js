import { useState, useContext } from "react";
import { Context } from "../Context";

const Note = () => {
    const [input, setInput] = useState("");
    const {
      selectedDate,
      cellsData,
      setCellsData
    } = useContext(Context);

    const updateNote = async (e) => {
        e.preventDefault();
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

        if (cellId === -2) return;

        console.log(input)
        await fetch("http://localhost:5000/dailydata/note/edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cellId: cellId, note: input }),
        })

        let newCellsData = [...cellsData];
        newCellsData.find(x => x._id === cellId).note = input;
        setCellsData(newCellsData);
        setInput("");
        console.log("Success:", cellsData);
    }

    return (
        <div >
            <form onSubmit={updateNote}>
            <input
            type="text"
            id="add"
            className="rounded w-[175px] m-2 bg-[#242831] border border-[#363b47] text-[#B7B1C7]"
            placeholder="add note"
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
  
  export default Note;