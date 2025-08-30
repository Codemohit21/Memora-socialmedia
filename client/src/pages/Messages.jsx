// import React from "react";
// import { dummyConnectionsData } from "../assets/assets";
// import { Eye, MessageSquare } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const Messages = () => {
//   const {connections}=useSelector((state)=>state.connections)
// const navigate=useNavigate();

//   return (
//     <div className="min-h-screen relative bg-slate-50">
//       <div className="max-w-6xl mx-auto p-6">
//         {/* Title */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-900 mb-2">Messages</h1>
//           <p className="text-slate-600">Talk to your friends and family</p>
//         </div>

//         {/* connected users */}

//         <div className="flex flex-col gap-3">
//           {connections.map((user) => (
//             <div
//               key={user.id}
//               className="max-w-xl flex flex-warp gap-5 p-6 bg-white shadow rounded-md"
//             >
//               <img
//                 src={user.profile_picture}
//                 alt=""
//                 className="rounded-full size-12 mx-auto"
//               />
//               <div className="flex-1">
//                 <p className="font-medium text-slate-700">{user.full_name}</p>
//                 <p className="text-slate-500">@{user.username}</p>
//                 <p className="text-sm text-gray-600">{user.bio}</p>
//               </div>

//               <div className="flex flex-col gap-2 mt-4">
//                 <button
//                 onClick={()=>{
//                   navigate(`/messages/${user._id}`);
//                 }}
//                   className="size-10 flex items-center justify-center text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-800 active: scale-95 transition cursor-pointer gap-1"
//                 >
//                   <MessageSquare className="w-4 h-4" />
//                 </button>

//                 <button
//                   onClick={() => {
//                     navigate(`/profile/${user._id}`);
//                   }}
//                   className="size-10 flex items-center justify-center text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-800 active: scale-95 transition cursor-pointer"
//                 >
//                   <Eye className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;
import React from "react";
import { Eye, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Messages = () => {
  const { connections } = useSelector((state) => state.connections);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#fdfcfb] via-[#e2d1c3] to-[#c9d6ff]">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2a2a2a] mb-2">Messages</h1>
          <p className="text-gray-600">Talk to your friends and family</p>
        </div>

        {/* Connected Users */}
        <div className="flex flex-col gap-4">
          {connections.map((user) => (
            <div
              key={user._id}
              className="max-w-xl flex gap-5 p-6 bg-[#f9f7f6] border border-gray-400/25 shadow-lg rounded-2xl hover:shadow-xl transition transform hover:scale-[1.02]"
            >
              <img
                src={user.profile_picture}
                alt=""
                className="rounded-full w-16 h-16 shadow-md transition-transform transform hover:scale-105"
              />
              <div className="flex-1">
                <p className="font-semibold text-[#2a2a2a]">{user.full_name}</p>
                <p className="text-gray-500">@{user.username}</p>
                <p className="text-gray-600 text-sm mt-1 truncate">{user.bio}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => navigate(`/messages/${user._id}`)}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#7fd7d7] via-[#3bbfbf] to-[#2fa6a6] hover:from-[#3bbfbf] hover:to-[#2fa6a6] active:scale-95 transition text-white shadow-md"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate(`/profile/${user._id}`)}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#eef2ff] hover:bg-[#e6e1da] active:scale-95 transition shadow-sm"
                >
                  <Eye className="w-5 h-5 text-gray-700 hover:text-gray-900" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
