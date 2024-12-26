import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import icon5 from "../../assets/icon5.png";
const FriendList = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
      <div className="flex items justify-between">
        <h2 className="font-bold text-lg mb-3">Friends</h2>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      <div className="overflow-y-scroll h-[350px] scrollbar-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img src={icon5} alt="Friend Icon" className="w-12 h-12" />
            <div className="pl-4">
              <p className="font-medium">Raghav</p>
              <p className="text-sm text-gray-500">Dinner?</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">Today, 8:56pm</p>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
