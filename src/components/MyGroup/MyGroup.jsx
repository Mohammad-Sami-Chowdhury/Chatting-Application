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

  // Fetch groups created by the user and their join requests
  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    const joinRequestsRef = ref(db, "joinRequests/");

    // Fetch admin's groups
    onValue(groupsRef, (snapshot) => {
      let adminGroups = [];
      snapshot.forEach((item) => {
        if (item.val().adminId === data.uid) {
          adminGroups.push(item.key); // Collect admin's group IDs
        }
      });

      // Fetch join requests for admin's groups
      onValue(joinRequestsRef, (snapshot) => {
        let requestsArr = [];
        adminGroups.forEach((groupId) => {
          if (snapshot.hasChild(groupId)) {
            snapshot.child(groupId).forEach((request) => {
              requestsArr.push({
                ...request.val(),
                groupId,
                userId: request.key,
              });
            });
          }
        });
        setJoinRequests(requestsArr);
      });
    });
  }, []);

  // Accept join request and add the user to the group
  const handleAcceptJoinRequest = (groupId, userId) => {
    const requestRef = ref(db, `joinRequests/${groupId}/${userId}`);
    const groupMembersRef = ref(db, `groups/${groupId}/members/${userId}`);

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
            // Remove the request
            remove(requestRef)
              .then(() => {
                toast.success("User successfully added to the group!");
              })
              .catch((error) => {
                toast.error("Error removing join request: " + error.message);
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

  // Reject join request
  const handleRejectJoinRequest = (groupId, userId) => {
    const requestRef = ref(db, `joinRequests/${groupId}/${userId}`);
    remove(requestRef)
      .then(() => {
        toast.info("Join request rejected.");
      })
      .catch((error) => {
        toast.error("Error rejecting join request: " + error.message);
      });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg mb-3">My Groups</h2>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>

      {/* List of groups created by the user */}
      <div className="overflow-y-scroll h-[340px] scrollbar-hidden">
        {myGroups.map((group) => (
          <div
            className="flex items-center justify-between mb-3"
            key={group.groupId}
          >
            <div className="flex items-center">
              <img src={icon7} alt="Group Icon" className="w-12 h-12" />
              <div className="pl-4">
                <p className="font-medium">{group.groupName}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">Yesterday, 6:22pm</p>
          </div>
        ))}
      </div>

      {/* Join Requests Section */}
      <div className="mt-4">
        <h2 className="font-bold text-lg mb-3">Join Requests</h2>
        <div className="overflow-y-scroll h-[200px] scrollbar-hidden">
          {joinRequests.length === 0 ? (
            <p className="text-gray-500">No join requests found.</p>
          ) : (
            joinRequests.map((request) => (
              <div
                className="flex items-center justify-between mb-3"
                key={request.userId}
              >
                <div className="flex items-center">
                  <img src={icon7} alt="User Icon" className="w-12 h-12" />
                  <div className="pl-4">
                    <p className="font-medium">{request.name}</p>
                    <p className="text-sm text-gray-500">{request.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleAcceptJoinRequest(request.groupId, request.userId)
                    }
                    className="bg-green-500 text-white px-4 py-1 rounded-lg"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleRejectJoinRequest(request.groupId, request.userId)
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
    </div>
  );
};

export default MyGroup;
