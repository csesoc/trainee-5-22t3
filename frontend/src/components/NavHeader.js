import React from "react";
import { useContext } from "react";
import { Context } from "../Context";

function NavHeader() {
  const { selectedDate } = useContext(Context);

  return (
    <div className="bg-[#1a1d22] justify-between flex rounded-3xl text-[#B7B1C7] h-[75px] p-4 m-3 text-left text-4xl font-mono">
      ./tracker
      <p>
        {selectedDate !== null
          ? new Date(selectedDate.toString()).toDateString()
          : new Date().toDateString()}
      </p>
    </div>
  );
}

export default NavHeader;
