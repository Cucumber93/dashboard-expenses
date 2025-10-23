import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/line`, { code });

        if (res.data.access_token) {
          localStorage.setItem("access_token", res.data.access_token);
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Login failed:", error);
        navigate("/login");
      }
    };

    handleCallback();
  }, []);

  return <div>กำลังตรวจสอบการเข้าสู่ระบบ...</div>;
}
