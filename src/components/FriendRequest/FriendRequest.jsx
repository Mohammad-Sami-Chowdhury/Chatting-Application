import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const data = useSelector((selector) => selector.userDetails.userInfo);
  const db = getDatabase();
  const [friendRequestList, setFriendRequestList] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "friendRequest/");
    onValue(usersRef, (snapshot) => {
      let friendRequestArr = [];
      snapshot.forEach((item) => {
        if (data.uid === item.val().reciverid) {
          friendRequestArr.push({ ...item.val(), key: item.key });
        }
      });
      setFriendRequestList(friendRequestArr);
    });
  }, [data.uid]);

  const handleAcceptRequest = (item) => {
    const friendData = {
      friendName: item.sendername,
      friendEmail: item.senderemail,
      friendProfile: item.senderProfile,
    };

    set(ref(db, `friends/${item.key}`), {
      friendName: data.displayName,
      friendEmail: data.email,
      // friendProfile: data.profile_picture,
    }),
      friendData;

    remove(ref(db, `friendRequest/${item.key}`))
      .then(() => {
        setFriendRequestList((prev) =>
          prev.filter((request) => request.key !== item.key)
        );
      })
      .catch((error) => {
        console.error("Error removing request:", error);
      });
  };

  const handleRejectRequest = (item) => {
    remove(ref(db, `friendRequest/${item.key}`))
      .then(() => {
        setFriendRequestList((prev) =>
          prev.filter((request) => request.key !== item.key)
        );
      })
      .catch((error) => {
        console.error("Error rejecting request:", error);
      });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
      <div className="flex items justify-between">
        <h2 className="font-bold text-lg mb-3">Friend Requests</h2>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      <div className="overflow-y-scroll h-[340px] scrollbar-hidden">
        {friendRequestList.length === 0 ? (
          <p>No friend requests yet</p>
        ) : (
          friendRequestList.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between mb-3"
            >
              <div className="flex items-center">
                <img
                  src={item.senderProfile || "https://via.placeholder.com/150"}
                  alt="Request Icon"
                  className="w-12 h-12 rounded-full"
                />
                <div className="pl-4">
                  <p className="font-medium">{item.sendername}</p>
                  <p className="text-sm text-gray-500">{item.senderemail}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleAcceptRequest(item)}
                  className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectRequest(item)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
