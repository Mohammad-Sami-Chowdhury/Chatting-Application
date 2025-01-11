// import React from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import MyGroup from "../../components/MyGroup/MyGroup";
// import FriendList from "../../components/FriendList/FriendList";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import icon1 from "../../assets/icon1.png";

// const Chat = () => {
//   return (
//     <div className="flex gap-x-10 mx-4 my-4">
//       <Sidebar className="w-[20%]" />
//       <div className="space-y-4 w-[30%]">
//         <MyGroup />
//         <FriendList />
//       </div>
//       <div className="w-[50%]">
//         <div className="flex items-center justify-between border-b-2 pb-5 mb-[55px] fixed w-[50%]">
//           <div className="flex items-center gap-x-10">
//             <img src={icon1} />
//             <div className="font-pops">
//               <h1 className="text-[24px] font-semibold">Swathi</h1>
//               <p className="text-base">Online</p>
//             </div>
//           </div>
//           <BsThreeDotsVertical size={40} className="cursor-pointer" />
//         </div>
//         <div className="relative text-base font-medium font-pops mt-[150px]">
//           <div className="absolute left-0">
//             <div className="relative bg-[#e0e0e0] text-black rounded-lg shadow-md p-4">
//               <div className="w-[50px] absolute  bottom-0 left-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#e0e0e0]"></div>
//               <p>This is your text or content.</p>
//             </div>
//           </div>
//           <div className="absolute right-0">
//             <div className="relative bg-[#5F35F5] text-white rounded-lg shadow-md p-4">
//               <div className="w-[50px] absolute  bottom-0 right-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#5F35F5]"></div>
//               <p>This is your</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MyGroup from "../../components/MyGroup/MyGroup";
import FriendList from "../../components/FriendList/FriendList";
import { BsThreeDotsVertical } from "react-icons/bs";
import icon1 from "../../assets/icon1.png";

const Chat = () => {
  return (
    <div className="flex gap-x-10 mx-4 my-4">
      <Sidebar className="w-[20%]" />
      <div className="space-y-4 w-[30%]">
        <MyGroup />
        <FriendList />
      </div>
      <div className="w-[50%]">
        <div className="flex items-center justify-between border-b-2 pb-5 mb-[55px] fixed w-[50%] z-[99999] bg-white">
          <div className="flex items-center gap-x-10">
            <img src={icon1} />
            <div className="font-pops">
              <h1 className="text-[24px] font-semibold">Swathi</h1>
              <p className="text-base">Online</p>
            </div>
          </div>
          <BsThreeDotsVertical size={40} className="cursor-pointer" />
        </div>

        <div className="relative text-base font-medium font-pops mt-[150px] h-[600px] overflow-y-auto overflow-x-hidden px-5">
          {/* Receiver's message */}
          <div className="relative mb-4 text-left">
            <div className="relative inline-block bg-[#e0e0e0] text-black rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 left-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#e0e0e0]"></div>
              <p>How are you?</p>
            </div>
          </div>

          {/* Sender's message */}
          <div className="relative mb-4 text-right">
            <div className="relative inline-block bg-[#5F35F5] text-white rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 right-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#5F35F5]"></div>
              <p>I'm fine & you?</p>
            </div>
          </div>
          {/* Receiver's message */}
          <div className="relative mb-4 text-left">
            <div className="relative inline-block bg-[#e0e0e0] text-black rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 left-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#e0e0e0]"></div>
              <p>How are you?</p>
            </div>
          </div>

          {/* Sender's message */}
          <div className="relative mb-4 text-right">
            <div className="relative inline-block bg-[#5F35F5] text-white rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 right-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#5F35F5]"></div>
              <p>I'm fine & you?</p>
            </div>
          </div>
          {/* Receiver's message */}
          <div className="relative mb-4 text-left">
            <div className="relative inline-block bg-[#e0e0e0] text-black rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 left-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#e0e0e0]"></div>
              <p>How are you?</p>
            </div>
          </div>

          {/* Sender's message */}
          <div className="relative mb-4 text-right">
            <div className="relative inline-block bg-[#5F35F5] text-white rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 right-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#5F35F5]"></div>
              <p>I'm fine & you?</p>
            </div>
          </div>
          {/* Receiver's message */}
          <div className="relative mb-4 text-left">
            <div className="relative inline-block bg-[#e0e0e0] text-black rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 left-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#e0e0e0]"></div>
              <p>How are you?</p>
            </div>
          </div>

          {/* Sender's message */}
          <div className="relative mb-4 text-right">
            <div className="relative inline-block bg-[#5F35F5] text-white rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 right-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#5F35F5]"></div>
              <p>I'm fine & you?</p>
            </div>
          </div>
          {/* Receiver's message */}
          <div className="relative mb-4 text-left">
            <div className="relative inline-block bg-[#e0e0e0] text-black rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 left-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#e0e0e0]"></div>
              <p>How are you?</p>
            </div>
          </div>

          {/* Sender's message */}
          <div className="relative mb-4 text-right">
            <div className="relative inline-block bg-[#5F35F5] text-white rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 right-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#5F35F5]"></div>
              <p>I'm fine & you?</p>
            </div>
          </div>
          {/* Receiver's message */}
          <div className="relative mb-4 text-left">
            <div className="relative inline-block bg-[#e0e0e0] text-black rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 left-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#e0e0e0]"></div>
              <p>How are you?</p>
            </div>
          </div>

          {/* Sender's message */}
          <div className="relative mb-4 text-right">
            <div className="relative inline-block bg-[#5F35F5] text-white rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 right-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#5F35F5]"></div>
              <p>I'm fine & you?</p>
            </div>
          </div>
          {/* Receiver's message */}
          <div className="relative mb-4 text-left">
            <div className="relative inline-block bg-[#e0e0e0] text-black rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 left-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#e0e0e0]"></div>
              <p>How are you?</p>
            </div>
          </div>

          {/* Sender's message */}
          <div className="relative mb-4 text-right">
            <div className="relative inline-block bg-[#5F35F5] text-white rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 right-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#5F35F5]"></div>
              <p>I'm fine & you?</p>
            </div>
          </div>
          {/* Receiver's message */}
          <div className="relative mb-4 text-left">
            <div className="relative inline-block bg-[#e0e0e0] text-black rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 left-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#e0e0e0]"></div>
              <p>How are you?</p>
            </div>
          </div>

          {/* Sender's message */}
          <div className="relative mb-4 text-right">
            <div className="relative inline-block bg-[#5F35F5] text-white rounded-lg shadow-md p-4">
              <div className="w-[50px] absolute bottom-0 right-[-7px] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-[#5F35F5]"></div>
              <p>I'm fine & you?</p>
            </div>
          </div>
        </div>
        <div className="fixed w-[50%] bg-white p-4">
          <input
            type="text"
            placeholder="Type a message"
            className="border-2 border-gray-300 p-2 w-[80%] rounded-lg focus:outline-none"
          />
          <button className="bg-[#5F35F5] text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
