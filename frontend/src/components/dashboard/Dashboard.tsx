import BottomBar from "./BottomBar"
import FooterBar from "./FooterBar"
import LeftBar from "./LeftBar"
import TopBar from "./TopBar"

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <TopBar/>
      <div className="w-full flex flex-row md:space-x-10">
        <LeftBar/>
        <BottomBar/>
      </div>
      <FooterBar/>
    </div>
  )
}

export default Dashboard