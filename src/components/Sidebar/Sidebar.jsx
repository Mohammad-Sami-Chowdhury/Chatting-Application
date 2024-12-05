import React, { useState } from "react";
import icon1 from "../../assets/icon1.png";
import { FaRegBell } from "react-icons/fa6";
import {
  IoHomeOutline,
  IoChatbubbleEllipses,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";

const Sidebar = () => {
  const [active, setActive] = useState("home");

  return (
    <div className="h-full w-[186px] bg-[#5F35F5] rounded-[20px] flex flex-col items-center py-5">
      {/* Profile Picture */}
      <div className="mb-[98px]">
        <img src={icon1} alt="Profile" />
      </div>

      {/* Home Icon */}
      <div className="pb-[0px]">
        <div
          className={`w-full flex items-center justify-center cursor-pointer  ${
            active === "home" ? "bg-white text-purple-600" : "text-white"
          } rounded-lg h-[89px] w-[150px] transition-colors duration-300`}
          onClick={() => setActive("home")}
        >
          <IoHomeOutline className="text-[40px]" />
        </div>
      </div>

      {/* Chat Icon */}
      <div className="pb-[0px]">
        <div
          className={`w-full flex items-center justify-center cursor-pointer  ${
            active === "chat" ? "bg-white text-purple-600" : "text-white"
          } rounded-lg h-[89px] w-[150px] transition-colors duration-300`}
          onClick={() => setActive("chat")}
        >
          <IoChatbubbleEllipses className="text-[40px]" />
        </div>
      </div>

      {/* Notifications Icon */}
      <div className="pb-[0px] ">
        <div
          className={`w-full flex items-center justify-center cursor-pointer ${
            active === "notifications"
              ? "bg-white text-purple-600"
              : "text-white"
          } rounded-lg h-[89px] w-[150px] transition-colors duration-300`}
          onClick={() => setActive("notifications")}
        >
          <FaRegBell className="text-[40px]" />
        </div>
      </div>

      {/* Settings Icon */}
      <div className="pb-[200px]">
        <div
          className={`w-full flex items-center justify-center cursor-pointer  ${
            active === "settings" ? "bg-white text-purple-600" : "text-white"
          } rounded-lg h-[89px] w-[150px] transition-colors duration-300`}
          onClick={() => setActive("settings")}
        >
          <IoSettingsOutline className="text-[40px]" />
        </div>
      </div>

      {/* Logout Icon */}
      <div className="text-white cursor-pointer">
          <IoLogOutOutline className="text-[40px]" />
      </div>
    </div>
  );
};

export default Sidebar;
