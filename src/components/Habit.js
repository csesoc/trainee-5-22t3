import { useEffect, useState } from "react";

const Habit = ({ habit }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(habit);
  }, [habit]);

  return (
    <div className="flex gap-[10px] pl-[20px]">
      <input type="checkbox" onChange={() => console.log(text)}/>
      {text}
    </div>
  )
}

export default Habit;
