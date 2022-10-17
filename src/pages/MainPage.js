import NavHeader from "../components/NavHeader";
import SideMenu from "../components/SideMenu";
import HeatmapContainer from "../components/HeatmapContainer";

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  const START_DATE = new Date('1/1/2022');
  const data = Array(90).fill(1)
    .map((ie, i) => {
      let date = START_DATE;
      date = date.addDays(i);
      return {
        date: date,
        index: i,
        note: 'placeholder',
        value: Math.round(Math.random()*1000)
      };
    });

const MainPage = () => {
    return (
        <div className='p-[20px] relative h-screen w-screen bg-[#19181C]'>
            <div className='bg-slate-700 block h-[75px]'>
                <NavHeader/>
            </div>
            <div className="mt-[20px] mx-[50px] flex gap-[20px] items-stretch h-[556px]">
                <HeatmapContainer data={data} highlightProperties={Array(1).fill(1)} isPropertiesHighlighted={true}/>
                <SideMenu/>
            </div>
            
        </div>
    )
}

export default MainPage;