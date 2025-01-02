import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserList = () => {
  const data = useSelector((state) => state.userDetails.userInfo);
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [friendRequests, setFriendRequests] = useState({});
  const [friends, setFriends] = useState({});

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          arr.push({ ...item.val(), userid: item.key });
        }
      });
      setUserList(arr);
    });

    const friendRequestsRef = ref(db, "friendRequest/");
    onValue(friendRequestsRef, (snapshot) => {
      let requests = {};
      snapshot.forEach((item) => {
        const request = item.val();
        if (request.senderid === data.uid) {
          requests[request.reciverid] = item.key;
        }
      });
      setFriendRequests(requests);
    });

    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      let friendsMap = {};
      snapshot.forEach((item) => {
        const friendPair = item.val();
        if (friendPair.senderid === data.uid || friendPair.reciverid === data.uid) {
          const friendId = friendPair.senderid === data.uid ? friendPair.reciverid : friendPair.senderid;
          friendsMap[friendId] = true;
        }
      });
      setFriends(friendsMap);
    });
  }, [data.uid]);

  const handleFriendRequest = (item) => {
    if (friendRequests[item.userid] || friends[item.userid]) {
      toast.warning("Action not allowed.");
      return;
    }

    const newRequest = {
      sendername: data.displayName,
      senderid: data.uid,
      senderemail: data.email,
      recivername: item.username,
      reciverid: item.userid,
      reciveremail: item.email,
    };

    set(push(ref(db, "friendRequest/")), newRequest)
      .then(() => {
        toast.success("Friend request sent!");
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  };

  const handleCancelRequest = (item) => {
    const requestID = friendRequests[item.userid];
    if (requestID) {
      remove(ref(db, `friendRequest/${requestID}`))
        .then(() => {
          toast.success("Friend request canceled!");
        })
        .catch((error) => {
          console.error("Error canceling request:", error);
        });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg mb-3">User List</h2>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      <div className="overflow-y-scroll h-[350px] scrollbar-hidden">
        {userList.map((item) => (
          <div key={item.userid} className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <img src={item.profile_picture || "https://via.placeholder.com/150"} alt="User Icon" className="w-12 h-12 rounded-full" />
              <div className="pl-4">
                <p className="font-medium">{item.username}</p>
                <p className="text-sm text-gray-500">{item.email}</p>
              </div>
            </div>
            {friends[item.userid] ? (
              <button className="bg-gray-400 text-white px-3 py-1 rounded-lg" disabled>
                Friend
              </button>
            ) : friendRequests[item.userid] ? (
              <button onClick={() => handleCancelRequest(item)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                -
              </button>
            ) : (
              <button onClick={() => handleFriendRequest(item)} className="bg-[#5F35F5] font-extrabold text-white px-3 py-1 rounded-lg">
                +
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
