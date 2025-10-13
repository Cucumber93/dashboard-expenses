import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
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

  if (!user) return <p>Loading...</p>

  return (
    <div className="p-5 text-center">
      <h2 className="text-2xl font-semibold mb-2">ยินดีต้อนรับ {user.name}</h2>
      <p>UserID: {user.sub}</p>

      <button
        className="mt-5 bg-red-500 text-white px-4 py-2 rounded-lg"
        onClick={() => {
          localStorage.clear()
          window.location.href = "/login"
        }}
      >
        Logout
      </button>
    </div>
  )
}
