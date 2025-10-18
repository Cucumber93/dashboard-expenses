import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

        // ถ้ายังไม่ได้ login ให้ redirect ไป login ของ LINE
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        // ✅ ได้ token จาก LINE
        const idToken = liff.getIDToken();

        if (!idToken) {
          liff.login();
          return;
        }

        // ✅ ส่ง token ไปให้ backend ตรวจสอบความถูกต้อง
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/verify-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          }
        );

        const data = await res.json();

        if (data.valid) {
          // ✅ เก็บเฉพาะ name, picture, token
          const userData = {
            name: data.displayName,      // จาก backend
            picture: data.pictureUrl,    // จาก backend
            token: idToken,              // token จาก LINE
          };

          localStorage.setItem("user", JSON.stringify(userData));
          console.log("✅ Login success:", userData);

          navigate("/");
        } else {
          // ❌ ถ้า token ไม่ valid ให้ login ใหม่
          localStorage.removeItem("user");
          liff.login();
        }
      } catch (err) {
        console.error("LIFF init error:", err);
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
