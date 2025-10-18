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
        await liff.ready; // ✅ รอให้ LIFF ready ก่อน

        console.log("✅ LIFF init success");

        // 🔹 ถ้ามี user ใน localStorage อยู่แล้ว → ข้าม login ทันที
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          console.log("👤 Already logged in, skipping LINE login");
          navigate("/");
          return;
        }

        // 🔹 เช็กว่า login แล้วหรือยัง
        if (!liff.isLoggedIn()) {
          console.log("➡️ Not logged in, redirecting to LINE...");
          liff.login({
            redirectUri: "https://dashboard-expenses.onrender.com/login",
          });
          return;
        }

        // ✅ ดึงข้อมูลโปรไฟล์และ token
        const profile = await liff.getProfile();
        const idToken = liff.getIDToken();

        if (!idToken) {
          console.log("❌ No token found, force re-login");
          liff.login({
            redirectUri: "https://dashboard-expenses.onrender.com/login",
          });
          return;
        }

        // ✅ ส่ง token ไป verify ที่ backend (optional)
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/verify-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          }
        );

        const data = await res.json();
        console.log("🧾 Backend verify result:", data);

        if (data.valid) {
          // ✅ เก็บข้อมูลไว้ localStorage
          const userData = {
            name: profile.displayName,
            picture: profile.pictureUrl,
            token: idToken,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          console.log("✅ Saved user:", userData);

          navigate("/");
        } else {
          console.log("❌ Invalid token, clear and re-login");
          localStorage.removeItem("user");
          liff.login({
            redirectUri: "https://dashboard-expenses.onrender.com/login",
          });
        }
      } catch (err) {
        console.error("💥 LIFF init error:", err);
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
