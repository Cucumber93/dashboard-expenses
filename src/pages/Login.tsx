import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      try {
        // ✅ เริ่มต้น LIFF
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

        // 🔸 ถ้ายังไม่ได้ login ให้ redirect ไปหน้า login ของ LINE
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        // ✅ ดึงข้อมูลผู้ใช้จาก LINE
        const profile = await liff.getProfile(); // <-- ดึงชื่อและรูปจาก LINE
        const idToken = liff.getIDToken();       // <-- ได้ token จาก LINE

        if (!idToken) {
          liff.login();
          return;
        }

        // ✅ ส่ง token ไปให้ backend ตรวจสอบความถูกต้อง (optional)
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/verify-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          }
        );

        const data = await res.json();

        // 🔹 ตรวจสอบว่า token valid
        if (data.valid) {
          // ✅ เก็บเฉพาะ name, picture, token ใน localStorage
          const userData = {
            name: profile.displayName,
            picture: profile.pictureUrl,
            token: idToken,
          };

          localStorage.setItem("user", JSON.stringify(userData));

          console.log("✅ Login success:", userData);
          navigate("/");
        } else {
          // ❌ ถ้า token ไม่ valid → ล้างข้อมูลแล้ว login ใหม่
          localStorage.removeItem("user");
          liff.login();
        }
      } catch (err) {
        console.error("❌ LIFF init error:", err);
      }
    };

    initLiff();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">LINE Login</h1>
      <p>กำลังตรวจสอบสถานะการเข้าสู่ระบบ...</p>
    </div>
  );
}
