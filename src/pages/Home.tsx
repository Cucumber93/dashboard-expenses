
// import './App.css'
import { useEffect, useState } from "react"
import ChartCard from "../pages/ChartCard"
import { OverviewCard } from "../pages/OverviewCard"
import Topbar from "../pages/Topbar"
import { useNavigate } from "react-router-dom"


function App() {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()
  useEffect(() => {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      } else {
        navigate("/login")
      }
    }, [navigate])

    useEffect(()=>{
      console.log('huhhhhhhhhhhhhh')
      console.log('user: ',user)
    },[user])
  return (
    <>ddd
    {user}
      <Topbar/>
      <OverviewCard/>
      <ChartCard/>
    </>
  )
}

export default App
