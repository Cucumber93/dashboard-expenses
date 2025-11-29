import liff from "@line/liff";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    liff.init({ liffId: "2008277464-bBvaglGD" });
  }, []);

  // const handleLogin = () => {
  //   if (!liff.isLoggedIn()) {
  //     // เริ่ม login และ redirect ไปหน้า /line หลังสำเร็จ
  //     liff.login({ redirectUri: window.location.origin + "/line" });
  //   }
  // };

  const handleLogin = () => {
    try{
      liff.login()
    }catch(err){
      console.log(err)
    }
  };


  return (
    <div  className="pr-5 pl-5 p-2 text-[#ffffff]">
      <button onClick={handleLogin}>Login with LINE</button>
    </div>
  );
}
