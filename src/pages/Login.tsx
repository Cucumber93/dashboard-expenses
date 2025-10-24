import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function Login() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({
          liffId: import.meta.env.VITE_LIFF_ID, // จาก LINE Developer Console
          withLoginOnExternalBrowser: true,
        });

        // ถ้ายังไม่ login ให้ redirect ไป login
        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: window.location.href });
          return;
        }

        // ถ้า login แล้ว ดึงข้อมูลผู้ใช้
        const profile = await liff.getProfile();
        const decoded = liff.getDecodedIDToken();

        const userData = {
          userId: profile.userId,
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
          statusMessage: profile.statusMessage,
          email: decoded?.email || "",
        };

        console.log("LINE Profile:", userData);
        setProfile(userData);

        // เก็บ token เพื่อใช้ใน ProtectedRoute
        localStorage.setItem("access_token", liff.getIDToken() || "");
      } catch (err) {
        console.error("LIFF init error:", err);
      }
    };

    initLiff();
  }, []);

  if (!profile)
    return <div style={{ padding: 40 }}>กำลังเข้าสู่ระบบผ่าน LINE...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h2>เข้าสู่ระบบสำเร็จ ✅</h2>
      <img
        src={profile.pictureUrl}
        alt="Profile"
        width={120}
        style={{ borderRadius: "50%" }}
      />
      <p><b>ID:</b> {profile.userId}</p>
      <p><b>ชื่อ:</b> {profile.displayName}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Status:</b> {profile.statusMessage}</p>
      <a href="/">ไปหน้า Home</a>
    </div>
  );
}
