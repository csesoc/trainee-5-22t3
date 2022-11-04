import HabitList from "./HabitList";
import { useContext } from "react";
import { Context } from "../Context";

const SideMenu = () => {
  const { selectedDate } = useContext(Context);

  return (
    <div className="bg-[#1a1d22] rounded-3xl min-h-[500px] text-[#B7B1C7] p-[10px] items-center m-3">
      {selectedDate !== null
        ? selectedDate.toDateString()
        : new Date().toDateString()}
      <div className="mb-[30px]">
        Do
        <HabitList type={"win"} />
      </div>
      <div>
        Don't Do
        <HabitList type={"loss"} />
      </div>
    </div>
  );
};

export default SideMenu;
