import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
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
                <img
                  src={""}
                  alt="Friend Icon"
                  className="w-12 h-12 rounded-full"
                />
                <div className="pl-4">
                  <p className="font-medium">Sami</p>
                  <p className="text-sm text-gray-500">sami@gmail.com</p>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default FriendList;
