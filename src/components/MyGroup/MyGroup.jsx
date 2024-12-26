import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import icon7 from "../../assets/icon7.png";

const MyGroup = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
                <div className="flex items justify-between">
                  <h2 className="font-bold text-lg mb-3">My Groups</h2>
                  <BsThreeDotsVertical className="cursor-pointer" />
                </div>
                <div className="overflow-y-scroll h-[340px] scrollbar-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon7} alt="Group Icon" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Crazy Cousins</p>
                        <p className="text-sm text-gray-500">
                          What plans today?
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Yesterday, 6:22pm</p>
                  </div>
                </div>
              </div>
  )
}

export default MyGroup
