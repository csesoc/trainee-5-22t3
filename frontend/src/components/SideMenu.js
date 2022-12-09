import HabitList from "./HabitList";
import Note from "./Note";

const SideMenu = () => {
  return (
    <>
      <div className="bg-[#1a1d22] rounded-3xl text-[#B7B1C7] p-[10px] pb-[20px] items-center m-3 text-xl">
        <div className="mb-[30px] font-bold">
          Do
          <HabitList type={"wins"} />
        </div>
        <div className="font-bold">
          Don't Do
          <HabitList type={"losses"} />
        </div>
        <div>
          Note
          <Note/>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
