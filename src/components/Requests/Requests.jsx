import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  push,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Requests = () => {
  const data = useSelector((state) => state.userDetails.userInfo);
  const db = getDatabase();
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [groupJoinRequests, setGroupJoinRequests] = useState([]);

  useEffect(() => {
    const friendRequestsRef = ref(db, "friendRequest/");
    const groupJoinRequestsRef = ref(db, "joinRequests/");

    // Fetch friend requests
    onValue(friendRequestsRef, (snapshot) => {
      let requests = [];
      snapshot.forEach((item) => {
        if (item.val().reciverid === data.uid) {
          requests.push({ ...item.val(), key: item.key });
        }
      });
      setFriendRequestList(requests);
    });

    // Fetch group join requests
    onValue(groupJoinRequestsRef, (snapshot) => {
      let requests = [];
      snapshot.forEach((groupSnapshot) => {
        groupSnapshot.forEach((item) => {
          if (item.val().adminId === data.uid) {
            requests.push({
              ...item.val(),
              key: item.key,
              groupId: groupSnapshot.key,
            });
          }
        });
      });
      setGroupJoinRequests(requests);
    });
  }, [data.uid, db]);

  const handleAcceptFriendRequest = (item) => {
    const newFriendEntry = {
      senderid: item.senderid,
      sendername: item.sendername,
      senderemail: item.senderemail,
      senderprofile: item.senderprofile,
      reciverid: data.uid,
      recivername: data.displayName,
      reciveremail: data.email,
      reciverprofile: data.photoURL,
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
        toast.error("Error accepting request:", error);
      });
  };

  const handleRejectFriendRequest = (item) => {
    remove(ref(db, `friendRequest/${item.key}`))
      .then(() => {
        setFriendRequestList((prev) =>
          prev.filter((request) => request.key !== item.key)
        );
        toast.info("Friend request rejected!");
      })
      .catch((error) => {
        toast.error("Error rejecting request:", error);
      });
  };

  const handleAcceptGroupJoinRequest = (groupId, userId) => {
    const requestRef = ref(db, `joinRequests/${groupId}/${userId}`);
    const groupMembersRef = ref(db, `groups/${groupId}/members/${userId}`);
    const userGroupsRef = ref(db, `users/${userId}/groups/${groupId}`);

    onValue(requestRef, (snapshot) => {
      if (snapshot.exists()) {
        const request = snapshot.val();

        // Add user to group members
        set(groupMembersRef, {
          uid: userId,
          name: request.name,
          email: request.email,
        })
          .then(() => {
            // Add group to user's groups list
            set(userGroupsRef, {
              groupId: groupId,
              groupName: request.groupName,
            })
              .then(() => {
                // Remove the request
                remove(requestRef)
                  .then(() => {
                    setGroupJoinRequests((prev) =>
                      prev.filter(
                        (req) => req.key !== userId || req.groupId !== groupId
                      )
                    );
                    toast.success("User successfully added to the group!");
                  })
                  .catch((error) => {
                    toast.error(
                      "Error removing join request: " + error.message
                    );
                  });
              })
              .catch((error) => {
                toast.error("Error adding group to user: " + error.message);
              });
          })
          .catch((error) => {
            toast.error("Error adding user to group: " + error.message);
          });
      } else {
        toast.error("Join request not found.");
      }
    });
  };

  const handleRejectGroupJoinRequest = (groupId, userId) => {
    const requestRef = ref(db, `joinRequests/${groupId}/${userId}`);
    remove(requestRef)
      .then(() => {
        setGroupJoinRequests((prev) =>
          prev.filter((req) => req.key !== userId || req.groupId !== groupId)
        );
        toast.info("Join request rejected.");
      })
      .catch((error) => {
        toast.error("Error rejecting join request: " + error.message);
      });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
      <div className="flex items justify-between">
        <h2 className="font-bold text-lg mb-3">Requests</h2>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      <div className="overflow-y-scroll h-[340px] scrollbar-hidden">
        <h3 className="font-bold text-md mb-3">Friend Requests</h3>
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
                  src={item.senderprofile || "https://via.placeholder.com/150"}
                  alt="Request Icon"
                  className="w-12 h-12 rounded-full"
                />
                <div className="pl-4">
                  <p className="font-medium">{item.sendername}</p>
                  <p className="text-sm text-gray-500">{item.senderemail}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleAcceptFriendRequest(item)}
                  className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectFriendRequest(item)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
        <h3 className="font-bold text-md mb-3">Group Join Requests</h3>
        {groupJoinRequests.length === 0 ? (
          <p>No group join requests yet</p>
        ) : (
          groupJoinRequests.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between mb-3"
            >
              <div className="flex items-center">
                <img
                  src={item.senderprofile || "https://via.placeholder.com/150"}
                  alt="Request Icon"
                  className="w-12 h-12 rounded-full"
                />
                <div className="pl-4">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() =>
                    handleAcceptGroupJoinRequest(item.groupId, item.key)
                  }
                  className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleRejectGroupJoinRequest(item.groupId, item.key)
                  }
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

export default Requests;
