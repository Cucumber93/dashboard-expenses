import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      try {
        console.log("🚀 เริ่มต้น LIFF");
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

        console.log("✅ LIFF init success");
        console.log("isLoggedIn (หลัง init):", liff.isLoggedIn());

        // ✅ STEP 1: ถ้ามี user ใน localStorage แล้ว ให้ข้าม login
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          console.log("👤 พบ user เดิมใน localStorage → ข้าม login");
          navigate("/");
          return;
        }

        // ✅ STEP 2: ถ้ายังไม่ login → login ใหม่ (พร้อม redirectUri)
        if (!liff.isLoggedIn()) {
          console.log("❌ ยังไม่ login → เรียก liff.login()");
          liff.login({
            redirectUri: "https://dashboard-expenses.onrender.com/login",
          });
          return;
        }

        // ✅ STEP 3: ถ้า login แล้ว → ดึงโปรไฟล์
        const profile = await liff.getProfile();
        const idToken = liff.getIDToken();

        console.log("👤 Profile:", profile);
        console.log("🔑 ID Token:", idToken);

        if (!idToken) {
          console.log("❌ ไม่มี token → login ใหม่");
          liff.login({
            redirectUri: "https://dashboard-expenses.onrender.com/login",
          });
          return;
        }

        // ✅ STEP 4: ส่ง token ไป verify ที่ backend
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
          const userData = {
            name: profile.displayName,
            picture: profile.pictureUrl,
            token: idToken,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          console.log("✅ บันทึกข้อมูล user:", userData);
          navigate("/");
        } else {
          console.log("❌ Token ไม่ valid → ล้างข้อมูลและ login ใหม่");
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
      <h1 className="text-2xl font-bold mb-4">LINE Login Debug</h1>
      <p>ดูผลลัพธ์ใน Console (F12)</p>
    </div>
  );
}
