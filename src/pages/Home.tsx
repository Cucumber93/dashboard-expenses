import { useEffect, useState } from "react";
import axios from "axios";
import liff from "@line/liff";
import { getLineLoginUrl } from "../utils/lineLogin";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

      // ถ้าอยู่ใน LINE App
      if (liff.isInClient()) {
        if (!liff.isLoggedIn()) liff.login();
        else {
          const p = await liff.getProfile();
          setProfile(p);
        }
      } else {
        // ถ้าอยู่นอก LINE App (Chrome/Safari)
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (token) {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify?token=${token}`);
          setProfile(res.data);
        } else {
          // ถ้ายังไม่มี token → redirect ไป LINE Login
          window.location.href = getLineLoginUrl();
        }
      }
    };
    init();
  }, []);

  if (!profile) return <p>Loading...</p>;
  return (
    <div className="text-center mt-10">
      <h1>สวัสดีคุณ {profile.name || profile.displayName}</h1>
      <img src={profile.picture || profile.pictureUrl} alt="profile" className="w-24 rounded-full mx-auto mt-4" />
    </div>
  );
}
