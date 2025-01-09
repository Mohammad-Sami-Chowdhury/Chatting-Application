import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, onValue, ref, push, set } from "firebase/database";
import { useSelector } from "react-redux";
import icon2 from "../../assets/icon2.png";

const GroupList = () => {
  const data = useSelector((state) => state.userDetails.userInfo);
  const db = getDatabase();
  const [createGroup, setCreateGroup] = useState(false);
  const [groupFocused, setEmailFocused] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupList, setGroupList] = useState([]);

  // Toggle group creation form visibility
  const handleCreateGroup = () => {
    setCreateGroup(!createGroup);
  };

  // Create a new group and add admin to members collection
  const handleDone = () => {
    const newGroupRef = push(ref(db, "groups/"));
    set(newGroupRef, {
      groupName: groupName,
      admin: data.displayName,
      adminId: data.uid,
    }).then(() => {
      // Create a "members" collection for the new group and add the admin as a member
      set(ref(db, `groups/${newGroupRef.key}/members/${data.uid}`), {
        uid: data.uid,
        name: data.displayName,
        email: data.email,
      }).then(() => {
        setGroupName("");
        setCreateGroup(false); // Close the group creation form
      });
    });
  };

  // Fetch groups list from database
  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.val().adminId) {  // Hide the group created by the user
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setGroupList(arr);
    });
  }, [db, data.uid]);

  // Send a join request
  const handleJoinRequest = (groupId) => {
    set(push(ref(db, `joinRequests/${groupId}/`)), {
      uid: data.uid,
      name: data.displayName,
      email: data.email,
    }).then(() => {
      alert("Join request sent!");
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
      <div className="flex items justify-between">
        <h2 className="font-bold text-lg mb-3">Groups List</h2>
        <button
          onClick={handleCreateGroup}
          className={`font-pops text-sm font-semibold px-2 rounded ${createGroup ? "bg-red-500 text-white" : "bg-[#5F35F5] text-white"}`}
        >
          {createGroup ? "Go Back" : "Create Group"}
        </button>
      </div>

      <div className="overflow-y-scroll h-[350px] scrollbar-hidden">
        {createGroup ? (
          <div className="mx-auto">
            <p className="text-2xl font-bold text-center mb-8">Create Your Group</p>
            <div className="relative mb-6 flex justify-center">
              <label
                className={`absolute tracking-[2px] left-[100px] px-1 text-sm transition-all duration-200 ${groupName || groupFocused ? "-top-2 bg-white text-[#5F35F5]" : "md:top-7 top-4 text-gray-500"}`}
              >
                Group Name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="border border-gray-300 bg-transparent w-[300px] md:w-[368px] md:py-[26px] md:pl-[52px] p-4 rounded-md focus:outline-[#5F35F5]"
              />
            </div>
            <button
              onClick={handleDone}
              className="bg-[#5F35F5] px-4 py-2 flex mx-auto rounded text-base text-white font-bold"
            >
              Done
            </button>
          </div>
        ) : (
          groupList.map((item) => (
            <div className="flex items-center justify-between mb-3" key={item.groupId}>
              <div className="flex items-center">
                <img src={icon2} alt="Group Icon" className="w-12 h-12" />
                <div className="pl-4">
                  <p className="font-medium">{item.groupName}</p>
                  <p className="text-sm text-gray-500">Hi Guys, Wassup!</p>
                </div>
              </div>
              <button
                onClick={() => handleJoinRequest(item.groupId)}
                className="bg-[#5F35F5] text-white px-4 py-1 rounded-lg"
              >
                Join
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupList;
