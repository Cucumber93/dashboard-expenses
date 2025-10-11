export default function Topbar() {
  return (
    <div className="flex justify-between p-2 bg-[#0C9AFF] items-center pl-5 pr-5">
      <div className="bg-gradient-to-r from-[#FFFFFF] to-[#A2D8FF] bg-clip-text text-transparent font-medium text-[18px]">
        CUCUMBER DASHBOARD
      </div>
      <div className="w-[34px] h-[34px] rounded-full overflow-hidden border-2 border-gray-300">
        <img
          src="/imgs/profile.jpg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
