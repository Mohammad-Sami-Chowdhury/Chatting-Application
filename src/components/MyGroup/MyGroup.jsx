import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, onValue, ref, set, remove } from "firebase/database";
import { useSelector } from "react-redux";
import icon7 from "../../assets/icon7.png";
import { toast } from "react-toastify";

const MyGroup = () => {
  const data = useSelector((state) => state.userDetails.userInfo);
  const db = getDatabase();
  const [myGroups, setMyGroups] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);

  // Fetch groups created by the user
  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid === item.val().adminId) {
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setMyGroups(arr);
    });

    const joinRequestsRef = ref(db, "joinRequests/");
    onValue(joinRequestsRef, (snapshot) => {
      let requestsArr = [];
      console.log("Join Requests Raw Snapshot:", snapshot.val()); // Debug: Log raw snapshot
      snapshot.forEach((groupItem) => {
        groupItem.forEach((requestItem) => {
          console.log("Processing Request:", requestItem.val()); // Debug: Log each request item
          requestsArr.push({ ...requestItem.val(), groupId: groupItem.key });
        });
      });
      console.log("Processed Join Requests:", requestsArr); // Debug: Log processed join requests
      setJoinRequests(requestsArr);
    });
  }, [db, data.uid]);

  // Accept join request and add the user to the members collection of the group
  const handleAcceptJoinRequest = (groupId, userId) => {
    const requestRef = ref(db, `joinRequests/${groupId}/${userId}`);
    const groupRef = ref(db, `groups/${groupId}/members/${userId}`);

    onValue(requestRef, (snapshot) => {
      if (snapshot.exists()) {
        const request = snapshot.val();
        set(groupRef, {
          uid: userId,
          name: request.name,
          email: request.email,
        }).then(() => {
          remove(requestRef).then(() => {
            toast.success("Request accepted and user added to the group!");
          });
        }).catch((error) => {
          toast.error("Error adding user to group: " + error.message);
        });
      } else {
        toast.error("Request not found.");
      }
    });
  };

  // Reject join request
  const handleRejectJoinRequest = (groupId, userId) => {
    const requestRef = ref(db, `joinRequests/${groupId}/${userId}`);
    remove(requestRef).then(() => {
      toast.info("Request rejected.");
    }).catch((error) => {
      toast.error("Error rejecting request: " + error.message);
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
      <div className="flex items justify-between">
        <h2 className="font-bold text-lg mb-3">My Groups</h2>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      <div className="overflow-y-scroll h-[340px] scrollbar-hidden">
        {myGroups.map((item) => (
          <div className="flex items-center justify-between mb-3" key={item.groupId}>
            <div className="flex items-center">
              <img src={icon7} alt="Group Icon" className="w-12 h-12" />
              <div className="pl-4">
                <p className="font-medium">{item.groupName}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">Yesterday, 6:22pm</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg mb-3">Join Requests</h2>
        <div className="overflow-y-scroll h-[200px] scrollbar-hidden">
          {joinRequests.length === 0 ? (
            <p className="text-gray-500">No join requests found.</p>
          ) : (
            joinRequests.map((request) => (
              <div className="flex items-center justify-between mb-3" key={request.uid}>
                <div className="flex items-center">
                  <img src={icon7} alt="User Icon" className="w-12 h-12" />
                  <div className="pl-4">
                    <p className="font-medium">{request.name}</p>
                    <p className="text-sm text-gray-500">{request.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAcceptJoinRequest(request.groupId, request.uid)}
                    className="bg-green-500 text-white px-4 py-1 rounded-lg"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectJoinRequest(request.groupId, request.uid)}
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
    </div>
  );
};

export default MyGroup;