// import React, { useEffect } from "react";
// import { dummyRecentMessagesData } from "../assets/assets";
// import { Link } from "react-router-dom";
// import moment from "moment";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// const RecentMessages = () => {
//   const [messages, setMessages] = React.useState([]);
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const fetchRecentMessages = async () => {
//     try {
//       const token = await getToken();
//       console.log("in feche recent message");
//       const { data } = await api.get('/api/user/recent-messages', {
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       console.log("Recent messages response:", data);


//       if (data.success) {
//         // Group messages by sender and get the latest message for each sender;
//         const groupedMessages = data.messages.reduce((acc, message) => {
//           const senderId = message.from_user_id._id;
//           if (
//             !acc[senderId] || new Date(message.createdAt) > new Date(acc[senderId].createdAt)
//           ) {
//             acc[senderId] = message;
//           }
//           return acc;
//         }, {});

//         // Sort messages by date
//         const sortedMessages = Object.values(groupedMessages).sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );

//         setMessages(sortedMessages);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {

//     if (user) {
//       console.log("use effect recent messages")
//       fetchRecentMessages();
//       console.log("use effect recent messages caleed")

//       setInterval(fetchRecentMessages, 30000);
//       return () => {
//         clearInterval();
//       }
//     }
//   }, [user]);
//   return (
//     <div className="bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800">
//       <h3 className="font-semibold text-slate-8 mb-4">Recent Messages</h3>
//       <div className="flex flex-col max-h-56 overflow-y-scroll no-scrollbar">
//         {messages.map((message, index) => (
//           <Link
//             to={`/messages/${message.from_user_id._id}`}
//             key={index}
//             className="flex items-start gap-2 py-2 hover :bg-slate-100"
//           >
//             <img
//               src={message.from_user_id.profile_picture}
//               alt="img"
//               className="w-8 h-8 rounded-full shadow"
//             />
//             <div className="w-full">
//               <div className="flex justify-between">
//                 <p className="font-medium">{message.from_user_id.full_name}</p>
//                 <p className="text-[10px] text-slate-400">
//                   {moment(message.createdAt).fromNow()}
//                 </p>
//               </div>
//               <div className="flex justify-between">
//                 <p className="text-gray-500">
//                   {message.text ? message.text : "Media"}
//                 </p>
//                 {!message.seen && (
//                   <p className="bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
//                     1
//                   </p>
//                 )}
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentMessages;
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const RecentMessages = () => {
  const [messages, setMessages] = React.useState([]);
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    let intervalId;

    const fetchRecentMessages = async () => {
      try {
        const token = await getToken();
        const { data } = await api.get("/api/user/recent-messages", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          const groupedMessages = data.messages.reduce((acc, message) => {
            const senderId = message.from_user_id._id;
            if (
              !acc[senderId] ||
              new Date(message.createdAt) > new Date(acc[senderId].createdAt)
            ) {
              acc[senderId] = message;
            }
            return acc;
          }, {});

          const sortedMessages = Object.values(groupedMessages).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setMessages(sortedMessages);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (user) {
      fetchRecentMessages();
      intervalId = setInterval(fetchRecentMessages, 30000);
    }

    return () => clearInterval(intervalId);
  }, [user, getToken]);

  const gradients = [
    "from-[#fff8e5] via-[#fff1c2] to-[#ffe9a8]",
    "from-[#fff9eb] via-[#fff3c7] to-[#ffedaa]",
    "from-[#fffbe6] via-[#fff5cd] to-[#fff0aa]",
    "from-[#fff9e7] via-[#fff4c8] to-[#ffefab]",
  ];

  return (
    <div
      className="p-4 rounded-2xl shadow-lg
        bg-gradient-to-b from-[#fff9e6] via-[#fff2c2] to-[#ffec99]
        border border-yellow-200"
    >
      {/* Title */}
      <h3 className="font-semibold text-gray-800 mb-3 text-lg text-center">
        Recent Messages
      </h3>

      {/* Messages */}
      <div className="flex flex-col max-h-80 overflow-y-auto no-scrollbar space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">No recent messages</p>
        )}

        {messages.map((message, index) => (
          <Link
  to={`/messages/${message.from_user_id._id}`}
  key={index}
  className={`flex gap-4 p-3 rounded-2xl shadow-md
    bg-gradient-to-r from-[#9370DB] via-[#8A2BE2] to-[#6A0DAD]
    hover:scale-105 hover:shadow-lg transition-transform duration-200 w-full`}
>
  {/* Avatar */}
  <img
    src={message.from_user_id.profile_picture}
    alt="Profile"
    className="w-12 h-12 rounded-full shadow-md flex-shrink-0"
  />

  {/* Text content */}
  <div className="flex flex-col w-full min-w-0">
    {/* Name and timestamp */}
    <div className="flex justify-between items-center mb-1">
      <p className="font-semibold text-white text-sm truncate">
        {message.from_user_id.full_name}
      </p>
      <p className="text-xs text-gray-200 ml-2">{moment(message.createdAt).fromNow()}</p>
    </div>

    {/* Message bubble */}
    <div className={`p-2 rounded-lg max-w-full
      ${!message.seen ? "bg-yellow-100 text-gray-900 font-medium" : "bg-purple-200 text-gray-800"}
      shadow-sm`}
    >
      {message.text ? message.text : "Media"}
    </div>

    {/* Unseen badge */}
    {!message.seen && (
      <div className="mt-1 w-fit">
        <span className="bg-indigo-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-semibold">
          1
        </span>
      </div>
    )}
  </div>
</Link>




        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
