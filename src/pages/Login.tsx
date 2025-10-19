import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

 useEffect(() => {
    const initLiff = async () => {
      try {
        const LIFF_ID = '2008277464-bBvaglGD'; // Use a constant for clarity
        const REDIRECT_URI = "https://dashboard-expenses.onrender.com/login"; // Your registered URI

        // 1. Check for local token (Fast path)
        const localToken = localStorage.getItem("access_token");
        if (localToken) {
          navigate("/");
          return; // Stop execution
        }

        // 2. Initialize LIFF
        await liff.init({ liffId: LIFF_ID });

        // 3. Check LINE Login status and trigger login if needed
        if (!liff.isLoggedIn()) {
          console.log("Not logged in to LINE. Redirecting for login.");
          // Crucially, this redirects the page. The rest of the code will NOT run in this session.
          liff.login({ redirectUri: REDIRECT_URI }); 
          return; // Stop execution after triggering redirection
        }

        // 4. If logged in, proceed with ID Token verification
        console.log("Logged in to LINE. Proceeding to verification.");
        const idToken = liff.getIDToken();
        if (!idToken) {
            console.error("LIFF is logged in but no ID Token available.");
            return;
        }

        // 5. Verify token with backend
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE}/auth/verify`,
          { idToken },
          { withCredentials: false }
        );

        if (res.data?.token) {
          localStorage.setItem("access_token", res.data.token);
          navigate("/");
        } else {
          console.error("Backend verification failed.");
        }
      } catch (err) {
        console.error("Login/LIFF Initialization error:", err);
      }
    };

    initLiff();
  }, [navigate]);

  return <div>กำลังเข้าสู่ระบบ...</div>;
}
