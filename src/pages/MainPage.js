import NavHeader from "../components/NavHeader";
import SideMenu from "../components/SideMenu";

const MainPage = () => {
    return (
        <div className='p-[20px] relative h-screen w-screen'>
            <NavHeader/>
            <SideMenu/>
        </div>
    )
}

export default MainPage;