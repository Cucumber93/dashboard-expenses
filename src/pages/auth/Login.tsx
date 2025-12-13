import liff from "@line/liff";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { IProfile } from "../../interface/line";
import { AuthService } from "../../services/auth.service";
export default function Login() {
  const navigate = useNavigate();
  const isDev =false
  useEffect(() => {
    localStorage.clear();
    liff.init({ liffId: "2008277464-bBvaglGD" });
  }, []);

  const handleLogin = () => {
    if (!liff.isLoggedIn()) {
      // เริ่ม login และ redirect ไปหน้า /line หลังสำเร็จ
      liff.login({ redirectUri: window.location.origin + "/line" });
    }
  };

  const handleDevLogin = async() => {
    console.log("Dev Login without LINE");
    const mockUser = {
       userId: 'Ub341a8b2875dcc02e7a1783b5b684d45',
      displayName: 'Tangkwa',
      pictureUrl: 'https://profile.line-scdn.net/0h_ma7CoxVAEJMThUxpOl-PTweAyhvP1lQaCsad3FHCXQkKhIcZ3tNICtIXyEleUESYSEYLCodXXdAXXckUhj8dkt-XXNwd0QSZi1IoQ',
    };

    await AuthService.loginLine(mockUser as IProfile);

    navigate("/"); // หรือหน้าไหนก็ได้
  };

  return (
    <div className="pr-5 pl-5 p-2 text-[#ffffff]">
      <button onClick={handleLogin} className="bg-black">
        Login with LINE
      </button>
      { isDev && <button
          onClick={handleDevLogin}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Dev Login (No LINE)
        </button>}
      
    </div>
  );
}
