import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const BlockList = () => {
  const data = useSelector((state) => state.userDetails.userInfo);
  const db = getDatabase();
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    const blockedRef = ref(db, "blockedUsers/");
    onValue(blockedRef, (snapshot) => {
      let blockedArr = [];
      snapshot.forEach((item) => {
        const blockedPair = item.val();
        if (blockedPair.blockedById === data.uid) {
          blockedArr.push({ ...blockedPair, key: item.key });
        }
      });
      setBlockedUsers(blockedArr);
    });
  }, [data.uid]);

  const handleUnblock = (blockedUser) => {
    const friend = {
      senderid: blockedUser.blockedById,
      sendername: blockedUser.blockedByName,
      senderemail: blockedUser.blockedByEmail,
      reciverid: blockedUser.blockedId,
      recivername: blockedUser.blockedName,
      reciveremail: blockedUser.blockedEmail,
    };

    remove(ref(db, `blockedUsers/${blockedUser.key}`))
      .then(() => {
        set(ref(db, `friends/${blockedUser.key}`), friend)
          .then(() => {
            toast.success("Unblocked successfully!");
            setBlockedUsers((prev) => prev.filter((item) => item.key !== blockedUser.key));
          })
      })
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
      <div className="flex items justify-between">
        <h2 className="font-bold text-lg mb-3">Blocked Users</h2>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      <div className="overflow-y-scroll h-[340px] scrollbar-hidden">
        {blockedUsers.length === 0 ? (
          <p>No blocked users</p>
        ) : (
          blockedUsers.map((blockedUser) => (
            <div key={blockedUser.key} className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <img src={"https://via.placeholder.com/150"} alt="Blocked Icon" className="w-12 h-12 rounded-full" />
                <div className="pl-4">
                  <p className="font-medium">{blockedUser.blockedName}</p>
                </div>
              </div>
              <button
                onClick={() => handleUnblock(blockedUser)}
                className="bg-green-500 text-white px-3 py-1 rounded-lg"
              >
                Unblock
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlockList;
