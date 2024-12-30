// import React, { useEffect, useState } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { getDatabase, ref, onValue, set, push } from "firebase/database";
// import { useSelector } from "react-redux";

// const UserList = () => {
//   const data = useSelector((selector) => selector.userDetails.userInfo);
//   const db = getDatabase();
//   const [userList, setUserList] = useState([]);
//   useEffect(() => {
//     const usersRef = ref(db, "users/");
//     onValue(usersRef, (snapshot) => {
//       let arr = [];
//       snapshot.forEach((item) => {
//         console.log(item.val(), "item");
//         if (data.uid != item.key) {
//           arr.push({...item.val(), userid: item.key});
//         }
//       });
//       setUserList(arr);
//     });
//   }, []);

//   const handleFriendRequest = (item) => {
//     console.log(item, "OK coll");
//     set(push(ref(db, "friendRequest/")), {
//       sendername: data.displayName,
//       senderid: data.uid,
//       // senderprofilepicture: data.imageUrl,
//       recivername: item.username,
//       reciverid: item.userid
//     });
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-main">
//       <div className="flex items justify-between">
//         <h2 className="font-bold text-lg mb-3">User List</h2>
//         <BsThreeDotsVertical className="cursor-pointer" />
//       </div>
//       <div className="overflow-y-scroll h-[350px] scrollbar-hidden">
//         {userList.map((item) => (
//           <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center">
//               <img
//                 src={item.profile_picture}
//                 alt="User Icon"
//                 className="w-12 h-12 rounded-full"
//               />
//               <div className="pl-4">
//                 <p className="font-medium">{item.username}</p>
//                 <p className="text-sm text-gray-500">{item.email}</p>
//               </div>
//             </div>
//             <button
//               onClick={() => handleFriendRequest(item)}
//               className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg"
//             >
//               +
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserList;

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
import { toast, ToastContainer } from "react-toastify";

const UserList = () => {
  const data = useSelector((state) => state.userDetails.userInfo); // Logged-in user info
  const db = getDatabase();
  const [userList, setUserList] = useState([]); // List of all users
  const [friendRequests, setFriendRequests] = useState({}); // Friend requests sent by the logged-in user

  // Fetch users and friend requests
  useEffect(() => {
    // Fetch user list
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

    // Fetch friend requests
    const friendRequestsRef = ref(db, "friendRequest/");
    onValue(friendRequestsRef, (snapshot) => {
      let requests = [];
      snapshot.forEach((item) => {
        const request = item.val();
        if (request.senderid === data.uid) {
          requests[request.reciverid] = item.key; // Store request ID
        }
      });
      setFriendRequests(requests); // Update state with request data
    });
  }, []);

  // Handle sending friend request
  const handleFriendRequest = (item) => {
    if (friendRequests[item.userid]) {
      console.log("Friend request already sent!");
    }

    const newRequest = {
      sendername: data.displayName,
      senderid: data.uid,
      recivername: item.username,
      reciverid: item.userid,
    };

    set(push(ref(db, "friendRequest/")), newRequest).then(() => {
      toast.success("Friend request sent!");
    });
  };

  // Handle canceling friend request
  const handleCancelRequest = (item) => {
    const requestID = friendRequests[item.userid]; // Get the request ID
    if (requestID) {
      remove(ref(db, `friendRequest/${requestID}`)).then(() => {
        toast.success("Friend request canceled!");
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />

      <div className="bg-white p-4 rounded-lg shadow-main">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg mb-3">User List</h2>
          <BsThreeDotsVertical className="cursor-pointer" />
        </div>
        <div className="overflow-y-scroll h-[350px] scrollbar-hidden">
          {userList.map((item) => (
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
              {friendRequests[item.userid] ? (
                <button
                  onClick={() => handleCancelRequest(item)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => handleFriendRequest(item)}
                  className="bg-[#5F35F5] text-white px-3 py-1 rounded-lg"
                >
                  Add
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
