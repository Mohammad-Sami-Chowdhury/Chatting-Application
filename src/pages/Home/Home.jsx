import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineEllipsis } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../components/Sidebar/Sidebar";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import icon5 from "../../assets/icon5.png";
import icon6 from "../../assets/icon6.png";
import icon7 from "../../assets/icon7.png";
import icon8 from "../../assets/icon8.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const auth = getAuth();
  const data = useSelector((state) => state.userDetails.userInfo);
  console.log(data);
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user.emailVerified) {
        setVerify(true);
        toast.success("Login Successfull");
      } else {
        setVerify(false);
        navigate("/login");
        toast.error("Please Verify Your Email");
      }
    });
  }, [auth, navigate]);

  return (
    <>
      {verify ? (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
          />
          {/* Sidebar */}
          <div className="w-full md:w-[10%] bg-gray-100 p-4 overflow-auto">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 p-4 overflow-auto">
            {/* Search Bar */}
            <div className="bg-white w-[480px] flex items-center p-3 rounded-lg shadow-md mb-5">
              <AiOutlineSearch className="text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Search"
                className="flex-grow w-full outline-none px-3 text-sm"
              />
              <AiOutlineEllipsis className="text-gray-500 text-xl" />
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Group List */}
              <div className="bg-white p-4 rounded-lg shadow-main">
                <div className="flex items justify-between">
                  <h2 className="font-bold text-lg mb-3">Groups List</h2>
                  <BsThreeDotsVertical className="cursor-pointer" />
                </div>
                <div className="overflow-y-scroll h-[350px]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon2} alt="Group Icon" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Friends Reunion</p>
                        <p className="text-sm text-gray-500">
                          Hi Guys, Wassup!
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Join
                    </button>
                  </div>
                  {/* Add more groups */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon3} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Friends Forever</p>
                        <p className="text-sm text-gray-500">
                          Good to see you.
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Join
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon4} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Crazy Cousins</p>
                        <p className="text-sm text-gray-500">
                          What plans today?
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Join
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon4} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Crazy Cousins</p>
                        <p className="text-sm text-gray-500">
                          What plans today?
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Join
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon4} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Crazy Cousins</p>
                        <p className="text-sm text-gray-500">
                          What plans today?
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Join
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon4} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Crazy Cousins</p>
                        <p className="text-sm text-gray-500">
                          What plans today?
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Join
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon4} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Crazy Cousins</p>
                        <p className="text-sm text-gray-500">
                          What plans today?
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Join
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon4} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Crazy Cousins</p>
                        <p className="text-sm text-gray-500">
                          What plans today?
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Join
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon4} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Crazy Cousins</p>
                        <p className="text-sm text-gray-500">
                          What plans today?
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Join
                    </button>
                  </div>
                </div>
              </div>

              {/* Friends List */}
              <div className="bg-white p-4 rounded-lg shadow-main">
                <div className="flex items justify-between">
                  <h2 className="font-bold text-lg mb-3">Friends</h2>
                  <BsThreeDotsVertical className="cursor-pointer" />
                </div>
                <div className="overflow-y-scroll h-[350px]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img
                        src={icon5}
                        alt="Friend Icon"
                        className="w-12 h-12"
                      />
                      <div className="pl-4">
                        <p className="font-medium">Raghav</p>
                        <p className="text-sm text-gray-500">Dinner?</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Today, 8:56pm</p>
                  </div>
                  {/* Add more friends */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon6} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Swathi</p>
                        <p className="text-sm text-gray-500">Sure!</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Today, 2:31pm</p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon7} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Kiran</p>{" "}
                        <p className="text-sm text-gray-500">Hi.....</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Yesterday, 6:22pm</p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon8} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Today, 12:22pm</p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon8} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Today, 12:22pm</p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon8} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Today, 12:22pm</p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon8} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Today, 12:22pm</p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon8} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Today, 12:22pm</p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon8} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Today, 12:22pm</p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon8} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Today, 12:22pm</p>
                  </div>
                </div>
              </div>

              {/* User List */}
              <div className="bg-white p-4 rounded-lg shadow-main">
                <div className="flex items justify-between">
                  <h2 className="font-bold text-lg mb-3">User List</h2>
                  <BsThreeDotsVertical className="cursor-pointer" />
                </div>
                <div className="overflow-y-scroll h-[350px]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon3} alt="User Icon" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Swathi</p>
                        <p className="text-sm text-gray-500">Today, 2:31pm</p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                      +
                    </button>
                  </div>
                  {/* Add more users */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon2} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Swathi</p>
                        <p className="text-sm text-gray-500">Today, 2:31pm</p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon3} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Kiran</p>
                        <p className="text-sm text-gray-500">
                          Yesterday, 6:22pm
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon4} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">Today, 12:22pm</p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon5} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Marvin McKinney</p>
                        <p className="text-sm text-gray-500">Today, 8:56pm</p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon5} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Marvin McKinney</p>
                        <p className="text-sm text-gray-500">Today, 8:56pm</p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon5} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Marvin McKinney</p>
                        <p className="text-sm text-gray-500">Today, 8:56pm</p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon5} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Marvin McKinney</p>
                        <p className="text-sm text-gray-500">Today, 8:56pm</p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon5} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Marvin McKinney</p>
                        <p className="text-sm text-gray-500">Today, 8:56pm</p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon5} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Marvin McKinney</p>
                        <p className="text-sm text-gray-500">Today, 8:56pm</p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Friend Requests */}
              <div className="bg-white p-4 rounded-lg shadow-main">
                <div className="flex items justify-between">
                  <h2 className="font-bold text-lg mb-3">Friend Requests</h2>
                  <BsThreeDotsVertical className="cursor-pointer" />
                </div>
                <div className="overflow-y-scroll h-[340px]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img
                        src={icon6}
                        alt="Request Icon"
                        className="w-12 h-12"
                      />
                      <div className="pl-4">
                        <p className="font-medium">Kiran</p>
                        <p className="text-sm text-gray-500">Hi.....</p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Accept
                    </button>
                  </div>
                  {/* Add more requests */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon7} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Swathi</p>
                        <p className="text-sm text-gray-500">Sure!</p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Accept
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon8} alt="" className="w-12 h-12" />
                      <div className="pl-4">
                        <p className="font-medium">Kiran</p>{" "}
                        <p className="text-sm text-gray-500">Hi.....</p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Accept
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon2} alt="" className="w-12 h-12" />

                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Accept
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon2} alt="" className="w-12 h-12" />

                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Accept
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon2} alt="" className="w-12 h-12" />

                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Accept
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon2} alt="" className="w-12 h-12" />

                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Accept
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon2} alt="" className="w-12 h-12" />

                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Accept
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon2} alt="" className="w-12 h-12" />

                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Accept
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img src={icon2} alt="" className="w-12 h-12" />

                      <div className="pl-4">
                        <p className="font-medium">Tejeshwini C</p>
                        <p className="text-sm text-gray-500">
                          I will call him today.
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg">
                      Accept
                    </button>
                  </div>
                </div>
              </div>

              {/* My Groups */}
              <div className="bg-white p-4 rounded-lg shadow-main">
                <div className="flex items justify-between">
                  <h2 className="font-bold text-lg mb-3">My Groups</h2>
                  <BsThreeDotsVertical className="cursor-pointer" />
                </div>
                <div className="overflow-y-scroll h-[340px]">

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <img src={icon7} alt="Group Icon" className="w-12 h-12" />
                    <div className="pl-4">
                      <p className="font-medium">Crazy Cousins</p>
                      <p className="text-sm text-gray-500">What plans today?</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Yesterday, 6:22pm</p>
                </div>
                {/* Add more groups */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <img src={icon3} alt="" className="w-12 h-12" />
                    <div className="pl-4">
                      <p className="font-medium">Swathi</p>
                      <p className="text-sm text-gray-500">Sure!</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Today, 2:31pm</p>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <img src={icon4} alt="" className="w-12 h-12" />
                    <div className="pl-4">
                      <p className="font-medium">Kiran</p>
                      <p className="text-sm text-gray-500">Hi.....</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Yesterday, 6:22pm</p>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <img src={icon5} alt="" className="w-12 h-12" />
                    <div className="pl-4">
                      <p className="font-medium">Tejeshwini C</p>
                      <p className="text-sm text-gray-500">
                        I will call him today.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Today, 12:22pm</p>
                </div>
                </div>
              </div>

              {/* Blocked Users */}
              <div className="bg-white p-4 rounded-lg shadow-main">
                <div className="flex items justify-between">
                  <h2 className="font-bold text-lg mb-3">Block Users</h2>
                  <BsThreeDotsVertical className="cursor-pointer" />
                </div>
                <div className="overflow-y-scroll h-[340px]">

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
                {/* Add more blocked users */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <img src={icon7} alt="" className="w-12 h-12" />
                    <div className="pl-4">
                      <p className="font-medium">Swathi</p>
                      <p className="text-sm text-gray-500">Today, 2:31pm</p>
                    </div>
                  </div>
                  <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                    Unblock
                  </button>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <img src={icon8} alt="" className="w-12 h-12" />
                    <div className="pl-4">
                      <p className="font-medium">Kiran</p>
                      <p className="text-sm text-gray-500">Yesterday, 6:22pm</p>
                    </div>
                  </div>
                  <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                    Unblock
                  </button>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <img src={icon2} alt="" className="w-12 h-12" />
                    <div className="pl-4">
                      <p className="font-medium">Tejeshwini C</p>
                      <p className="text-sm text-gray-500">Today, 12:22pm</p>
                    </div>
                  </div>
                  <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                    Unblock
                  </button>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <img src={icon2} alt="" className="w-12 h-12" />
                    <div className="pl-4">
                      <p className="font-medium">Tejeshwini C</p>
                      <p className="text-sm text-gray-500">Today, 12:22pm</p>
                    </div>
                  </div>
                  <button className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg">
                    Unblock
                  </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
