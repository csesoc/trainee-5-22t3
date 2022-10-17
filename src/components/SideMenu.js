import Habit from "./Habit"

const SideMenu = () => {

    return (
        <div className='bg-[#201D26] inline-block w-1/4 rounded-3xl text-[#B7B1C7] p-[10px]'>
            Do
            <Habit habit="make bed"/>
            <Habit habit="clean room"/>
            <Habit habit="study"/>
            Don't Do
            <Habit habit="tiktok"/>
            <Habit habit="sleep late"/>
            <Habit habit="nap"/>
        </div>
    )
}

export default SideMenu;