import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      window.location.href = "/";
      return;
    }

    const clientId = import.meta.env.VITE_LINE_LOGIN_CLIENT_ID;
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    const state = "random_state_123";
    const scope = "openid%20profile%20email";

    const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

    window.location.href = lineLoginUrl;
  }, []);

  return <div>กำลังเข้าสู่ระบบผ่าน LINE...</div>;
}
