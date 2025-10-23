import { useEffect } from "react";
import liff from "@line/liff";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      try {
        const localToken = localStorage.getItem("access_token");
        if (localToken) {
          navigate("/");
          return;
        }

        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        await liff.ready;

        if (!liff.isLoggedIn()) {
          // ใช้ origin ให้ตรงกับที่ตั้งใน LINE Developer
          liff.login({ redirectUri: `https://dashboard-expenses.onrender.com/login` });
          return;
        }

        const idToken = liff.getIDToken();
        console.log("LINE idToken:", idToken);

        if (idToken) {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/verify`,
            { idToken }
          );
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
