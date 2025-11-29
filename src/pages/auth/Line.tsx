import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";
import { AuthService } from "../../services/auth.service";
import type { IProfile } from "../../interface/line";

export default function Line() {
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({
          liffId: "2008277464-bBvaglGD",
          withLoginOnExternalBrowser: true, // ✅ ต้องใส่ในหน้านี้!
        });

        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: window.location.href });
          return;
        }

        const profile = await liff.getProfile();
        const res = await AuthService.loginLine(profile as IProfile);

        console.log("Backend response:", res);

        // ❗ เช็คว่ามี token ไหม
        if (!res?.token) {
          console.error("❌ Token not returned from backend");
          return;
        }

        // ❗ รอให้ localStorage เขียน token เสร็จ
        await new Promise((resolve) => setTimeout(resolve, 200));

        console.log(
          "TOKEN IN LOCALSTORAGE:",
          localStorage.getItem("auth_token")
        );

        navigate("/");
      } catch (err) {
        console.error("LIFF init error:", err);
      }
    };

    initLiff();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h3>กำลังเข้าสู่ระบบด้วย LINE...</h3>
    </div>
  );
}
