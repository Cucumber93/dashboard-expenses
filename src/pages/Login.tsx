import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('---before---')
    const initLiff = async () => {
      try {
        const localToken = localStorage.getItem("access_token");
        if (localToken) {
          navigate("/");
          return;
        }

        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        await liff.ready;

        console.log("isLoggedIn:", liff.isLoggedIn());

        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: "https://dashboard-expenses.onrender.com/login" });
          return;
        }

        const idToken = liff.getIDToken();
        console.log("idToken:", idToken);
        if (!idToken) return;

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE}/auth/verify`,
          { idToken },
          { withCredentials: false }
        );
        console.log("backend response:", res.data);

        if (res.data?.token) {
          localStorage.setItem("access_token", res.data.token);
          navigate("/");
        }else{
          return false
        }
      } catch (err) {
        console.error("login error:", err);
      }
    };

    initLiff();
    console.log('---after---')
  }, [navigate]);

  return <div>กำลังเข้าสู่ระบบ...</div>;
}
