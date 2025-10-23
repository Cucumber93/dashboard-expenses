import { useEffect } from "react";
import liff from "@line/liff";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        await liff.ready;

        // ถ้ายังไม่ login ให้ redirect ไปหน้า LINE Login
        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: window.location.href });
          return;
        }

        // หลัง login แล้ว จะได้ idToken
        const idToken = liff.getIDToken();
        console.log("LINE idToken:", idToken);

        if (idToken) {
          // ส่ง token ไปตรวจสอบที่ backend
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/verify`,
            { idToken }
          );

          // เก็บ access token ไว้
          localStorage.setItem("access_token", res.data.access_token);

          navigate("/");
        }
      } catch (err) {
        console.error("LIFF init error:", err);
      }
    };

    initLiff();
  }, []);

  return <div>กำลังเข้าสู่ระบบผ่าน LINE...</div>;
}
