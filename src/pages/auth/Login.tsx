import { useEffect } from "react";
import liff from "@line/liff";

export default function Login() {

  // useEffect(() => {
  //   const initLiff = async () => {
  //     try {
  //       await liff.init({
  //         liffId: import.meta.env.VITE_LIFF_ID, // จาก LINE Developer Console
  //         withLoginOnExternalBrowser: true,
  //       });

  //       // ถ้ายังไม่ login ให้ redirect ไป login
  //       if (!liff.isLoggedIn()) {
  //         liff.login({ redirectUri: window.location.href });
  //         return;
  //       }

  //       // ถ้า login แล้ว ดึงข้อมูลผู้ใช้
  //       const profile = await liff.getProfile();
  //       const decoded = liff.getDecodedIDToken();

  //       const userData = {
  //         userId: profile.userId,
  //         displayName: profile.displayName,
  //         pictureUrl: profile.pictureUrl,
  //         statusMessage: profile.statusMessage,
  //         email: decoded?.email || "",
  //       };

  //       console.log("LINE Profile:", userData);
  //       setProfile(userData);

  //       // เก็บ token เพื่อใช้ใน ProtectedRoute
  //       localStorage.setItem("access_token", liff.getIDToken() || "");
  //     } catch (err) {
  //       console.error("LIFF init error:", err);
  //     }
  //   };

  //   initLiff();
  // }, []);

  useEffect(()=>{
    liff.init({liffId:'2008277464-bBvaglGD'})
  },[])

  const handleLoginLiff = ()=>{
    try{

      liff.login()
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <button onClick={handleLoginLiff} className="text-white">Login With Line</button>
    </div>
  );
}
