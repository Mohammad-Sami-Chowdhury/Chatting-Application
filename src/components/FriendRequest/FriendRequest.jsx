import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import icon6 from "../../assets/icon6.png";

const FriendRequest = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
      <div className="flex items justify-between">
        <h2 className="font-bold text-lg mb-3">Friend Requests</h2>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      <div className="overflow-y-scroll h-[340px] scrollbar-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img src={icon6} alt="Request Icon" className="w-12 h-12" />
            <div className="pl-4">
              <p className="font-medium">Kiran</p>
              <p className="text-sm text-gray-500">Hi.....</p>
            </div>
          </div>
          <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
