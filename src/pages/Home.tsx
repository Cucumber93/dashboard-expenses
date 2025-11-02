
import ChartCard from "./ChartCard";
import { OverviewCard } from "./OverviewCard";
import Topbar from "./Topbar";


function App() {
  return (
    <>
      <Topbar/>
      <div className="mb-10">
        <OverviewCard/>
        <ChartCard/>
      </div>
      
    </>
  )
}

export default App
