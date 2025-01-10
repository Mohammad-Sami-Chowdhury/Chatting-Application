import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineEllipsis } from "react-icons/ai";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "../../index.css";
import UserList from "../../components/userList/userList";
import FriendList from "../../components/FriendList/FriendList";
import BlockList from "../../components/BlockList/BlockList";
import GroupList from "../../components/GroupList/GroupList";
import MyGroup from "../../components/MyGroup/MyGroup";
import Requests from "../../components/Requests/Requests";

const Home = () => {
  const auth = getAuth();
  const data = useSelector((state) => state.userDetails.userInfo);
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
            closeOnClick={true}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 rounded-md">
              {/* Group List */}
              <GroupList />
              {/* Friends List */}
              <FriendList />
              {/* User List */}
              <UserList />
              {/* Friend Requests */}
              <Requests/>
              {/* My Groups */}
              <MyGroup />
              {/* Blocked Users */}
              <BlockList />
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
