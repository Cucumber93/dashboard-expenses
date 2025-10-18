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

        console.log("✅ LIFF initialized.");
        console.log("isLoggedIn:", liff.isLoggedIn());

        // 🔹 1️⃣ ถ้ามี user อยู่แล้ว → ข้ามไปหน้า /
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          console.log("👤 Found existing user in localStorage → redirect to /");
          navigate("/");
          return;
        }

        // 🔹 2️⃣ ถ้ายังไม่ login → ไปหน้า LINE Login
        if (!liff.isLoggedIn()) {
          console.log("➡️ Redirecting to LINE Login...");
          liff.login({
            redirectUri: "https://dashboard-expenses.onrender.com/login", // ✅ ต้องตรงกับ domain ใน LINE Developers
          });
          return;
        }

        // 🔹 3️⃣ ดึงข้อมูลผู้ใช้จาก LINE
        const profile = await liff.getProfile();
        const idToken = liff.getIDToken();

        if (!idToken) {
          console.log("❌ No ID Token, force re-login.");
          liff.login({
            redirectUri: "https://dashboard-expenses.onrender.com/login",
          });
          return;
        }

        console.log("👤 Profile:", profile);
        console.log("🪪 ID Token:", idToken);

        // 🔹 4️⃣ (Optional) ตรวจสอบ token กับ backend
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/verify-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          }
        );

        const data = await res.json();
        console.log("🧾 Verify result:", data);

        // 🔹 5️⃣ ถ้า token valid → เก็บข้อมูลไว้ใน localStorage
        if (data.valid) {
          const userData = {
            name: profile.displayName,
            picture: profile.pictureUrl,
            token: idToken,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          console.log("✅ Saved user:", userData);
          navigate("/");
        } else {
          console.log("❌ Invalid token, clearing user and re-login...");
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
