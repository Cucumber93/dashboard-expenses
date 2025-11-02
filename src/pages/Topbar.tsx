import { useState } from "react";
import { useAuth } from "../context/authContext";
import { AuthService } from "../services/auth.service";

export default function Topbar() {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      // 👉 optional: redirect หลัง logout
      window.location.href = "/login";
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  function DropdownLogout() {
    return (
      <div
        className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-[120px] text-gray-300 text-center cursor-pointer hover:bg-gray-100 transition-all"
        onClick={handleLogout}
      >
        Logout
      </div>
    );
  }

  return (
    <div className="flex justify-between p-2 bg-[#0C9AFF] items-center pl-5 pr-5 relative">
      <div className="bg-gradient-to-r from-[#FFFFFF] to-[#A2D8FF] bg-clip-text text-transparent font-medium text-[18px]">
        CUCUMBER DASHBOARD
      </div>

      <div className="flex gap-3 items-center text-white">
        <div>{user?.displayName}</div>

        {/* 🔹 ทำเป็น relative เพื่อให้ dropdown อยู่ใต้รูป */}
        <div className="relative">
          <div
            className="w-[34px] h-[34px] rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src={user?.pictureUrl || "/default-profile.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 🔹 แสดง dropdown เมื่อกด */}
          {isDropdownOpen && <DropdownLogout />}
        </div>
      </div>
    </div>
  );
}
