import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import icon8 from "../../assets/icon8.png";

const BlockList = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
      <div className="flex items justify-between">
        <h2 className="font-bold text-lg mb-3">Block Users</h2>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      <div className="overflow-y-scroll h-[340px] scrollbar-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img src={icon8} alt="Blocked Icon" className="w-12 h-12" />
            <div className="pl-4">
              <p className="font-medium">Tejeshwini C</p>
              <p className="text-sm text-gray-500">Blocked today.</p>
            </div>
          </div>
          <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
            Unblock
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockList;
