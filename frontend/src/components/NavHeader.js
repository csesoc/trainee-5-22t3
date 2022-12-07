import React from "react";
import { useContext } from "react";
import { Context } from "../Context";

function NavHeader() {
  const { selectedDate, setPage } = useContext(Context);

  return (
    <div className="bg-[#1a1d22] grid grid-rows-1 grid-cols-4 rounded-3xl text-[#B7B1C7] h-[75px] p-4 gap-10 text-left text-4xl font-mono">
      ./tracker
      <button className="bg-[#242831] rounded-2xl text-4xl font-bold" onClick={() => setPage("Heatmap")}>
        Heatmap
      </button>
      <button className="bg-[#242831] rounded-2xl text-4xl font-bold" onClick={() => setPage("Stats")}>
        Stats
      </button>
      <p>
        {selectedDate !== null
          ? new Date(selectedDate.toString()).toDateString()
          : new Date().toDateString()}
      </p>
    </div>
  );
}

export default NavHeader;
