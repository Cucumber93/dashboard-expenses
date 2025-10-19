import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        // ถ้ามี token อยู่แล้ว → ไปหน้า /
        navigate("/");
        return;
      }

      console.log('liff id: ',import.meta.env.VITE_LIFF_ID)
      await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href });
        return;
      }

      const idToken = liff.getIDToken();
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/auth/line`, { idToken });

      localStorage.setItem("access_token", res.data.token);
      navigate("/"); // กลับหน้า Home หลัง login สำเร็จ
    };

    initLiff();
  }, [navigate]);

  return <div>กำลังเข้าสู่ระบบ...</div>;
}
