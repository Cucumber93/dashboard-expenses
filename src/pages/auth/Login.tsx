import liff from "@line/liff";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    liff.init({ liffId: "2008277464-bBvaglGD" });
  }, []);

  const handleLogin = () => {
    if (!liff.isLoggedIn()) {
      // เริ่ม login และ redirect ไปหน้า /line หลังสำเร็จ
      liff.login({ redirectUri: window.location.origin + "/line" });
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={handleLogin}>Login with LINE</button>
    </div>
  );
}
