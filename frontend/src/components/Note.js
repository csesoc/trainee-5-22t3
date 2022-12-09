import { useEffect, useState, useContext } from "react";
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
        console.log(input)
        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        await fetch("http://localhost:5000/dailydata/note/edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cellDate: date, note: input }),
        })

        console.log("here")

        let newCellsData = [...cellsData];
        console.log(newCellsData.find(x => new Date(x.date.getFullYear(), x.date.getMonth(), x.date.getDate()) === date));
        for(let x of newCellsData) {
            console.log(new Date(x.date.getFullYear(), x.date.getMonth(), x.date.getDate()) == date);
        }
        console.log(date)
        newCellsData.find(x => new Date(x.date.getFullYear(), x.date.getMonth(), x.date.getDate()) === date).note = input;
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