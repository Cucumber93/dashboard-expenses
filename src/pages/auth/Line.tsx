import liff from "@line/liff";
import { useEffect } from "react";
import { AuthService } from "../../services/auth.service";
import type { IProfile } from "../../interface/line";
import { useNavigate } from "react-router-dom";

const Line = () => {
  const navigate = useNavigate();
  useEffect(() => {
    liff.init({ liffId: "2008277464-bBvaglGD" }).then(() => {
      //code
      handleLogin();
    });
  }, []);

  const handleLogin = async () => {
    try {
      const profile = await liff.getProfile();
      await AuthService.loginLine(profile as IProfile)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
        navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return <div>Line</div>;
};

export default Line;
