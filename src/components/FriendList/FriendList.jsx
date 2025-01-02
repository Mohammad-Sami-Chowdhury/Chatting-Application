import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FriendList = () => {
  const data = useSelector((state) => state.userDetails.userInfo);
  const db = getDatabase();
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      let friendsArr = [];
      snapshot.forEach((item) => {
        const friendPair = item.val();
        if (friendPair.senderid === data.uid || friendPair.reciverid === data.uid) {
          friendsArr.push({ ...friendPair, key: item.key });
        }
      });
      setFriendsList(friendsArr);
    });
  }, [data.uid]);

  const handleUnfriend = (friend) => {
    remove(ref(db, `friends/${friend.key}`))
      .then(() => {
        toast.success("Unfriended successfully!");
        setFriendsList((prev) => prev.filter((item) => item.key !== friend.key));
      })
      .catch((error) => {
        console.error("Error unfriending:", error);
      });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
      <div className="flex items justify-between">
        <h2 className="font-bold text-lg mb-3">Friends</h2>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      <div className="overflow-y-scroll h-[350px] scrollbar-hidden">
        {friendsList.length === 0 ? (
          <p>No friends yet</p>
        ) : (
          friendsList.map((friend) => (
            <div key={friend.key} className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <img src={"https://via.placeholder.com/150"} alt="Friend Icon" className="w-12 h-12 rounded-full" />
                <div className="pl-4">
                  <p className="font-medium">{friend.senderid === data.uid ? friend.recivername : friend.sendername}</p>
                  <p className="text-sm text-gray-500">
                    {friend.senderid === data.uid ? friend.reciveremail : friend.senderemail}
                  </p>
                </div>
              </div>
              <button onClick={() => handleUnfriend(friend)} className="bg-red-500 text-white px-4 py-1 rounded-lg">
                Unfriend
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendList;
