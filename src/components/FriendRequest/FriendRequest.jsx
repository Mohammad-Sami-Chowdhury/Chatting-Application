import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  remove,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FriendRequest = () => {
  const data = useSelector((state) => state.userDetails.userInfo);
  const db = getDatabase();
  const [friendRequestList, setFriendRequestList] = useState([]);

  useEffect(() => {
    const friendRequestsRef = ref(db, "friendRequest/");
    onValue(friendRequestsRef, (snapshot) => {
      let requests = [];
      snapshot.forEach((item) => {
        if (item.val().reciverid === data.uid) {
          requests.push({ ...item.val(), key: item.key });
        }
      });
      setFriendRequestList(requests);
    });
  }, [data.uid]);

  const handleAcceptRequest = (item) => {
    const newFriendEntry = {
      senderid: item.senderid,
      sendername: item.sendername,
      reciverid: data.uid,
      recivername: data.displayName,
    };

    set(push(ref(db, "friends/")), newFriendEntry)
      .then(() => remove(ref(db, `friendRequest/${item.key}`)))
      .then(() => {
        setFriendRequestList((prev) =>
          prev.filter((request) => request.key !== item.key)
        );
        toast.success("Friend request accepted!");
      })
      .catch((error) => {
        console.error("Error accepting request:", error);
      });
  };

  const handleRejectRequest = (item) => {
    remove(ref(db, `friendRequest/${item.key}`))
      .then(() => {
        setFriendRequestList((prev) =>
          prev.filter((request) => request.key !== item.key)
        );
        toast.info("Friend request rejected!");
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
