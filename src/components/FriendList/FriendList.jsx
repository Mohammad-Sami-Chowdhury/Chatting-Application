import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const FriendList = () => {
  const data = useSelector((state) => state.userDetails.userInfo);
  const db = getDatabase();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const friendsRef = ref(db, "friends/");
    const unsubscribe = onValue(friendsRef, (snapshot) => {
      let friendList = [];
      snapshot.forEach((item) => {
        const friendPair = item.val();
        if (
          friendPair.senderid === data.uid ||
          friendPair.reciverid === data.uid
        ) {
          friendList.push({
            id: item.key,
            name:
              friendPair.senderid === data.uid
                ? friendPair.recivername
                : friendPair.sendername,
            email:
              friendPair.senderid === data.uid
                ? friendPair.reciveremail
                : friendPair.senderemail,
            profile_picture:
              friendPair.senderid === data.uid
                ? friendPair.reciverProfile
                : friendPair.senderProfile,
          });
        }
      });
      setFriends(friendList);
    });

    return () => unsubscribe();
  }, [db, data.uid]);

  const handleUnfriend = (friendId) => {
    remove(ref(db, `friends/${friendId}`))
      .then(() => {
        setFriends((prev) => prev.filter((friend) => friend.id !== friendId));
        toast.success("Friend removed successfully!");
      })
      .catch((error) => {
        console.error("Error removing friend:", error);
        toast.error("Failed to remove friend. Please try again.");
      });
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <div className="bg-white p-4 rounded-lg shadow-main">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg mb-3">Friends</h2>
          <BsThreeDotsVertical className="cursor-pointer" />
        </div>
        <div className="overflow-y-scroll h-[350px] scrollbar-hidden">
          {friends.length === 0 ? (
            <p className="text-gray-500">No friends yet</p>
          ) : (
            friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between mb-3"
              >
                <div className="flex items-center">
                  <img
                    src={
                      friend.profile_picture ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Friend Icon"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="pl-4">
                    <p className="font-medium">{friend.name}</p>
                    {/* <p className="text-sm text-red-500">{friend.email}</p> */}
                  </div>
                </div>
                <button
                  onClick={() => handleUnfriend(friend.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Unfriend
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
