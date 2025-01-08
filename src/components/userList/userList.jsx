import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserList = () => {
  const data = useSelector((state) => state.userDetails.userInfo);
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [friendRequests, setFriendRequests] = useState({});
  const [incomingFriendRequests, setIncomingFriendRequests] = useState({});
  const [friends, setFriends] = useState({});
  const [blockedUsers, setBlockedUsers] = useState({});
  const [blockedByUsers, setBlockedByUsers] = useState({});

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
      let incomingRequests = {};
      snapshot.forEach((item) => {
        const request = item.val();
        if (request.senderid === data.uid) {
          requests[request.reciverid] = item.key;
        }
        if (request.reciverid === data.uid) {
          incomingRequests[request.senderid] = { key: item.key, ...request };
        }
      });
      setFriendRequests(requests);
      setIncomingFriendRequests(incomingRequests);
    });

    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      let friendsMap = {};
      snapshot.forEach((item) => {
        const friendPair = item.val();
        if (
          friendPair.senderid === data.uid ||
          friendPair.reciverid === data.uid
        ) {
          const friendId =
            friendPair.senderid === data.uid
              ? friendPair.reciverid
              : friendPair.senderid;
          friendsMap[friendId] = true;
        }
      });
      setFriends(friendsMap);
    });

    const blockedRef = ref(db, "blockedUsers/");
    onValue(blockedRef, (snapshot) => {
      let blocked = {};
      let blockedBy = {};
      snapshot.forEach((item) => {
        const blockInfo = item.val();
        if (blockInfo.blockedById === data.uid) {
          blocked[blockInfo.blockedId] = true;
        }
        if (blockInfo.blockedId === data.uid) {
          blockedBy[blockInfo.blockedById] = true;
        }
      });
      setBlockedUsers(blocked);
      setBlockedByUsers(blockedBy);
    });
  }, [data.uid]);

  const handleFriendRequest = (item) => {
    if (
      friendRequests[item.userid] ||
      incomingFriendRequests[item.userid] ||
      friends[item.userid] ||
      blockedUsers[item.userid] ||
      blockedByUsers[item.userid]
    ) {
      toast.warning("Action not allowed.");
      return;
    }

    const newRequest = {
      sendername: data.displayName,
      senderid: data.uid,
      senderemail: data.email,
      senderprofile: data.photoURL,
      recivername: item.username,
      reciverid: item.userid,
      reciveremail: item.email,
      reciverprofile: item.profile_picture,
    };

    set(push(ref(db, "friendRequest/")), newRequest).then(() => {
      toast.success("Friend request sent!");
    });
  };

  const handleCancelRequest = (item) => {
    const requestID = friendRequests[item.userid];
    if (requestID) {
      remove(ref(db, `friendRequest/${requestID}`)).then(() => {
        toast.success("Friend request canceled!");
      });
    }
  };

  const handleAcceptRequest = (item) => {
    const request = incomingFriendRequests[item.userid];
    if (request) {
      const newFriendEntry = {
        senderid: request.senderid,
        sendername: request.sendername,
        senderemail: request.senderemail,
        senderprofile: request.senderprofile,
        reciverid: data.uid,
        recivername: data.displayName,
        reciveremail: data.email,
        reciverprofile: data.photoURL,
      };

      set(push(ref(db, "friends/")), newFriendEntry)
        .then(() => remove(ref(db, `friendRequest/${request.key}`)))
        .then(() => {
          toast.success("Friend request accepted!");
        })
        .catch((error) => {
          console.error("Error accepting request:", error);
        });
    }
  };

  const handleRejectRequest = (item) => {
    const request = incomingFriendRequests[item.userid];
    if (request) {
      remove(ref(db, `friendRequest/${request.key}`))
        .then(() => {
          toast.info("Friend request rejected!");
        })
        .catch((error) => {
          console.error("Error rejecting request:", error);
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
        {userList
          .filter((user) => !blockedByUsers[user.userid]) // Exclude users who blocked the current user
          .map((item) => (
            <div
              key={item.userid}
              className="flex items-center justify-between mb-3"
            >
              <div className="flex items-center">
                <img
                  src={
                    item.profile_picture || "https://via.placeholder.com/150"
                  }
                  alt="User Icon"
                  className="w-12 h-12 rounded-full"
                />
                <div className="pl-4">
                  <p className="font-medium">{item.username}</p>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
              </div>
              {friends[item.userid] ? (
                <button
                  className="bg-gray-400 text-white px-3 py-1 rounded-lg"
                  disabled
                >
                  Friend
                </button>
              ) : blockedUsers[item.userid] ? (
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  disabled
                >
                  Blocked
                </button>
              ) : incomingFriendRequests[item.userid] ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAcceptRequest(item)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectRequest(item)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              ) : friendRequests[item.userid] ? (
                <button
                  onClick={() => handleCancelRequest(item)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Cancel Request
                </button>
              ) : (
                <button
                  onClick={() => handleFriendRequest(item)}
                  className="bg-[#5F35F5] font-extrabold text-white px-3 py-1 rounded-lg"
                >
                  Add Friend
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
