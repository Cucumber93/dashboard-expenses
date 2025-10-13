import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import liff from "@line/liff"

export default function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID })

        const token = localStorage.getItem("liff_id_token")

        if (!liff.isLoggedIn() && !token) {
          liff.login()
        } else {
          const idToken = liff.getIDToken()
          if (idToken) {
            localStorage.setItem("liff_id_token", idToken)

            // ตรวจสอบ token กับ backend
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/verify-token`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idToken }),
            })
            const data = await res.json()

            if (data.valid) {
              localStorage.setItem("user", JSON.stringify(data.user))
              navigate("/")
            } else {
              localStorage.removeItem("liff_id_token")
              liff.login()
            }
          } else {
            // ถ้าไม่มี idToken (กรณี liff ยังไม่พร้อม)
            liff.login()
          }
        }
      } catch (err) {
        console.error("LIFF init error:", err)
      }
    }

    initLiff()
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">LINE Login</h1>
      <p>กำลังตรวจสอบสถานะการเข้าสู่ระบบ...</p>
    </div>
  )
}
