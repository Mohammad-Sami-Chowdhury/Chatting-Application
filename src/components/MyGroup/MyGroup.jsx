import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import icon7 from "../../assets/icon7.png";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const MyGroup = () => {
  const data = useSelector((state) => state.userDetails.userInfo);
  const db = getDatabase();
  const [myGroups, setmyGroups] = useState([]);
  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid === item.val().adminId) {
          // Only groups created by the user
          arr.push({ ...item.val(), userid: item.key });
        }
      });
      setmyGroups(arr);
    });
  }, [db, data.uid]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-main">
      <div className="flex items justify-between">
        <h2 className="font-bold text-lg mb-3">My Groups</h2>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      <div className="overflow-y-scroll h-[340px] scrollbar-hidden">
        {myGroups.map((item) => (
          <div className="flex items-center justify-between mb-3">
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
    </div>
  );
};

export default MyGroup;
