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
        await AuthService.loginLine(profile as IProfile);

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
