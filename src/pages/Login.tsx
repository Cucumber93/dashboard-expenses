import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      try {
        const localToken = localStorage.getItem("access_token");
        if (localToken) {
          console.log("🔹 already logged in, redirect to home");
          navigate("/");
          return;
        }

        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        await liff.ready;

        console.log("✅ liff.ready done");
        console.log("liff.isLoggedIn():", liff.isLoggedIn());

        if (!liff.isLoggedIn()) {
          console.log("🌀 Not logged in → redirect to LINE");
          liff.login({ redirectUri: window.location.origin + "/login" });
          return;
        }

        const idToken = liff.getIDToken();
        console.log("🎫 idToken:", idToken);

        if (!idToken) {
          console.warn("⚠️ No idToken found from LIFF");
          return;
        }

        const res = await axios.post(`${import.meta.env.VITE_API_BASE}/auth/line`, { idToken });
        localStorage.setItem("access_token", res.data.token);

        console.log("✅ Login success, go home");
        navigate("/");
      } catch (err) {
        console.error("❌ LIFF login error:", err);
      }
    };

    initLiff();
  }, [navigate]);

  return <div>กำลังเข้าสู่ระบบ...</div>;
}
