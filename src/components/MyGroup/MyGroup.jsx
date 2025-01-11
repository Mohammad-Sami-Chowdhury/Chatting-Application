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
      let adminGroupsDetails = [];
      snapshot.forEach((item) => {
        if (item.val().adminId === data.uid) {
          adminGroups.push(item.key); // Collect admin's group IDs
          adminGroupsDetails.push({
            groupId: item.key,
            groupName: item.val().groupName,
          });
          // Collect admin's group details
        }
      });
      setMyGroups(adminGroupsDetails); // Set myGroups state with fetched groups

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
  }, [data.uid, db]);

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
    </div>
  );
};

export default MyGroup;
