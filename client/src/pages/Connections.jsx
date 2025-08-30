// import React from "react";
// import {
//   Users,
//   UserPlus,
//   UserCheck,
//   UserRoundPen,
//   MessageSquare,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useAuth } from "@clerk/clerk-react";
// import { useEffect } from "react";
// import { fetchConnections } from "../features/connections/connectionSlice";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// // import {
// //   dummyConnectionsData as connections,
// //   dummyFollowersData as followers,
// //   dummyFollowingData as following,
// //   dummyPendingConnectionsData as pendingConnections,
// // } from "../assets/assets";

// const Connections = () => {
//   const [currentTab, setCurrentTab] = React.useState("Followers");
//   const navigate = useNavigate();

//   const { getToken } = useAuth();
//   const dispatch = useDispatch();

//   const { connections, pendingConnections, followers, following } = useSelector(
//     (state) => state.connections
//   );
//   console.log(connections)
//   console.log(pendingConnections)

//   console.log(followers)
//   console.log(following)
//   const dataArray = [
//     { label: "Followers", value: followers, icon: Users },
//     { label: "Following", value: following, icon: UserCheck },
//     { label: "Pending", value: pendingConnections, icon: UserRoundPen },
//     { label: "Connections", value: connections, icon: UserPlus },
//   ];

//   const handleUnfollow = async (userId) => {
//     try {
      
//       const { data } = await api.post(
//         "/api/user/unfollow",
//         { id: userId },
//         {
//           headers: { Authorization: `Bearer ${await getToken()}` },
//         }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         dispatch(fetchConnections(await getToken()));
//       } else {
//         toast(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };



//   const acceptConnection = async (userId) => {
//     try {
    
//       const { data } = await api.post(
//         "/api/user/accept",
//         { id: userId },
//         {
//           headers: { Authorization: `Bearer ${await getToken()}` },
//         }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         dispatch(fetchConnections(await getToken()));
//       } else {
//         toast(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getToken().then((token) => {
//       dispatch(fetchConnections(token));
//     });
//   }, [dispatch]);
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-6xl mx-auto p-6">
//         {/* Title */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-900 mb-2">
//             Connections
//           </h1>
//           <p className="text-slate-600">
//             Manage your network and discover new connections
//           </p>
//         </div>

//         {/* {counts} */}
//         <div className="mb-8 flex flex-wrap gap-6">
//           {dataArray.map((item,index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center justify-center gap-1 border h-20 w-40 border-gray-200 bg-white shadow rounded-md"
//             >
//               <b>{item.value.length}</b>
//               <p className="text-slate-600">{item.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Tabs */}

//         <div
//           className="inline-flex flex-wrap items-center border border-gray-200
// rounded-md p-1 bg-white shadow-sm"
//         >
//           {dataArray.map((tab) => (
//             <button
//               key={tab.label}
//               onClick={() => setCurrentTab(tab.label)}
//               className={`cursor-pointer flex items-center px-3 py-1 text-sm rounded-md transition-colors ${
//                 currentTab === tab.label
//                   ? "bg-white font-medium text-black"
//                   : "text-gray-500 hover:text-black"
//               }`}
//             >
//               <tab.icon className="w-4 h-4" />
//               <span className="ml-1">{tab.label}</span>
//               {tab.count !== undefined && (
//                 <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
//                   {tab.count}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>

//         {/* connections */}

//         <div className="flex flex-wrap gap-6 mt-6">
//           {dataArray
//             .find((item) => item.label === currentTab)
//             .value.map((user) => (
//               <div
//                 key={user._id}
//                 className="w-full max-w-88 flex gap-5 p-6 bg-white shadow rounded-md "
//               >
//                 <img
//                   src={user.profile_picture}
//                   alt=""
//                   className="rounded-full w-12 h-12 shadow-md mx-auto"
//                 />
//                 <div className="flex-1">
//                   <p className="font-medium text-slate-700">{user.full_name}</p>
//                   <p className="text-slate-500">@{user.username}</p>
//                   <p className="text-sm text-gray-600">
//                     {user.bio.slice(0, 30)} ..
//                   </p>

//                   <div className="flex max-sm:flex-col gap-2 mt-4">
//                     {
//                       <button
//                         onClick={() => navigate(`/profile/${user._id}`)}
//                         className="w-full p-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active: scale-95 transition text-white cursor-pointer"
//                       >
//                         View Profile
//                       </button>
//                     }

//                     {currentTab === "Following" && (
//                       <button onClick={()=>handleUnfollow(user._id)} className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active: scale-95 transition cursor-pointer">
//                         Unfollow
//                       </button>
//                     )}
//                     {currentTab === "Pending" && (
//                       <button  onClick={()=>acceptConnection(user._id)} className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active: scale-95 transition cursor-pointer">
//                         Accept
//                       </button>
//                     )}
//                     {currentTab === "Connections" && (
//                       <button
//                         onClick={() => navigate(`/messages/${user._id}`)}
//                         className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-800  active: scale-95 transition cursor-pointer flex items-center justify-center gap-1"
//                       >
//                         <MessageSquare className="w-4 h-4" />
//                         Message
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Connections;
import React, { useEffect, useState } from "react";
import { Users, UserPlus, UserCheck, UserRoundPen, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import { fetchConnections } from "../features/connections/connectionSlice";
import api from "../api/axios";
import toast from "react-hot-toast";

const Connections = () => {
  const [currentTab, setCurrentTab] = useState("Followers");
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const { connections, pendingConnections, followers, following } = useSelector(
    (state) => state.connections
  );

  const dataArray = [
    { label: "Followers", value: followers, icon: Users },
    { label: "Following", value: following, icon: UserCheck },
    { label: "Pending", value: pendingConnections, icon: UserRoundPen },
    { label: "Connections", value: connections, icon: UserPlus },
  ];

  const handleUnfollow = async (userId) => {
    try {
      const { data } = await api.post(
        "/api/user/unfollow",
        { id: userId },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success(data.message);
        dispatch(fetchConnections(await getToken()));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const acceptConnection = async (userId) => {
    try {
      const { data } = await api.post(
        "/api/user/accept",
        { id: userId },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success(data.message);
        dispatch(fetchConnections(await getToken()));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getToken().then((token) => {
      dispatch(fetchConnections(token));
    });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf6f0] via-[#f9f3ed] to-[#f3ece5]">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Connections</h1>
          <p className="text-gray-600">Manage your network and discover new connections</p>
        </div>

        {/* Counts */}
        <div className="mb-8 flex flex-wrap gap-6">
          {dataArray.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-1 bg-white/70 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl h-20 w-40 p-4"
            >
              <b className="text-gray-900 text-xl">{item.value.length}</b>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="inline-flex flex-wrap items-center border border-gray-200 rounded-2xl p-1 bg-white/70 shadow-sm mb-6 backdrop-blur-md">
          {dataArray.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setCurrentTab(tab.label)}
              className={`cursor-pointer flex items-center px-4 py-2 text-sm rounded-2xl transition-colors ${
                currentTab === tab.label
                  ? "bg-gradient-to-r from-[#7fd7d7] via-[#3bbfbf] to-[#2fa6a6] text-white font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <tab.icon className="w-4 h-4 mr-1" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Users */}
        <div className="flex flex-wrap gap-6">
          {dataArray
  .find((item) => item.label === currentTab)
  ?.value.map((user) => (
    <div
      key={user._id}
      className="w-full max-w-88 flex flex-col md:flex-row gap-5 p-6 bg-white/70 shadow-lg rounded-2xl backdrop-blur-md border border-gray-200 transition transform hover:scale-105"
    >
      {/* Profile Image */}
      <img
        src={user.profile_picture}
        alt=""
        className="rounded-full w-16 h-16 md:w-20 md:h-20 shadow-lg object-cover"
      />

      {/* User Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="font-bold text-gray-900 text-lg">{user.full_name}</p>
          <p className="text-gray-500">@{user.username}</p>
          <p className="text-sm text-gray-600 mt-1">{user.bio.slice(0, 60)}{user.bio.length > 60 && "..."}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={() => navigate(`/profile/${user._id}`)}
            className="flex-1 py-2 px-4 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#7fd7d7] via-[#3bbfbf] to-[#2fa6a6] text-white shadow-md hover:scale-105 transition transform"
          >
            View Profile
          </button>

          {currentTab === "Following" && (
            <button
              onClick={() => handleUnfollow(user._id)}
              className="flex-1 py-2 px-4 text-sm rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-sm transition"
            >
              Unfollow
            </button>
          )}

          {currentTab === "Pending" && (
            <button
              onClick={() => acceptConnection(user._id)}
              className="flex-1 py-2 px-4 text-sm rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-sm transition"
            >
              Accept
            </button>
          )}

          {currentTab === "Connections" && (
            <button
              onClick={() => navigate(`/messages/${user._id}`)}
              className="flex-1 py-2 px-4 text-sm rounded-xl bg-gradient-to-r from-[#fcd34d] via-[#fbbf24] to-[#f59e0b] text-white shadow-md hover:scale-105 transition transform flex items-center justify-center gap-1"
            >
              <MessageSquare className="w-4 h-4" />
              Message
            </button>
          )}
        </div>
      </div>
    </div>
  ))}

        </div>
      </div>
    </div>
  );
};

export default Connections;
