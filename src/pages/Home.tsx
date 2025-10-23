
// import './App.css'
// import { useEffect, useState } from "react"
// import ChartCard from "../pages/ChartCard"
// import { OverviewCard } from "../pages/OverviewCard"
// import Topbar from "../pages/Topbar"
// import { useNavigate } from "react-router-dom"


function App() {
  // const [user, setUser] = useState<any>(null)
  // const navigate = useNavigate()
  // useEffect(() => {
  //     const userData = localStorage.getItem("user")
  //     if (userData) {
  //       setUser(JSON.parse(userData))
  //     } else {
  //       navigate("/login")
  //     }
  //   }, [navigate])

  //   useEffect(()=>{
  //     console.log('huhhhhhhhhhhhhh')
  //     console.log('user: ',user)
  //   },[user])
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };
  return (
    <>
      {/* <Topbar/>
      <OverviewCard/>
      <ChartCard/> */}
      <div style={{ padding: 40 }}>
      <h1>ยินดีต้อนรับ 🎉</h1>
      <p>เข้าสู่ระบบด้วย LINE สำเร็จแล้ว</p>
      <button onClick={handleLogout}>ออกจากระบบ</button>
    </div>
    </>
  )
}

export default App
