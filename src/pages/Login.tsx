import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      try {
        console.log("🚀 Initializing LIFF...");
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        await liff.ready;

        // ✅ 1️⃣ ถ้ามี user ใน localStorage → Auto login เลย
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          console.log("👤 Auto-login success:", JSON.parse(savedUser));
          navigate("/");
          return;
        }

        // ✅ 2️⃣ ถ้ายังไม่มี token → login กับ LINE
        const idToken = liff.getIDToken();

        if (!idToken) {
          console.log("🕹 Logging in via LINE...");
          liff.login({
            redirectUri: "https://dashboard-expenses.onrender.com/login", // ต้องตรงกับ LINE Developers
          });
          return;
        }

        // ✅ 3️⃣ ดึงข้อมูลโปรไฟล์จาก LINE
        const profile = await liff.getProfile();

        // ✅ 4️⃣ เก็บ token + ชื่อ + รูป
        const userData = {
          name: profile.displayName,
          picture: profile.pictureUrl,
          token: idToken,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        console.log("✅ Saved new user:", userData);

        // ✅ 5️⃣ redirect ไปหน้า /
        navigate("/");
      } catch (err) {
        console.error("💥 LIFF init error:", err);
      }
    };

    initLiff();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">LINE Auto Login</h1>
      <p>กำลังตรวจสอบสถานะการเข้าสู่ระบบ...</p>
    </div>
  );
}
