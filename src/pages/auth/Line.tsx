import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import liff from "@line/liff";
import { AuthService } from "../../services/auth.service";
import type { IProfile } from "../../interface/line";

export default function Line() {
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      await liff.init({ liffId: "2008277464-bBvaglGD" });

      // 👇 ตรงนี้ liff.isLoggedIn() จะเป็น true แล้ว เพราะ LINE redirect กลับมาหลัง login เสร็จ
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        await AuthService.loginLine(profile as IProfile);
        navigate("/");
      } else {
        // กันกรณีเข้าหน้านี้ตรง ๆ โดยไม่ login
        liff.login({ redirectUri: window.location.href });
      }
    };

    initLiff();
  }, [navigate]);

  return <div>กำลังเข้าสู่ระบบด้วย LINE...</div>;
}
