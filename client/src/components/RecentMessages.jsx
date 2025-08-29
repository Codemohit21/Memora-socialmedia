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

  // Gradient options for variety
  const gradients = [
    "from-[#fdfcfb] via-[#f5ebe0] to-[#ede7f6]",
    "from-[#fff8f0] via-[#fbe6d6] to-[#e8e0f3]",
    "from-[#fefcf7] via-[#f7e9dc] to-[#e4e1f5]",
    "from-[#fdf9f3] via-[#f3e7d9] to-[#ece2f6]",
  ];

  return (
    <div className="max-w-xs mt-4 p-4 min-h-20">
      <h3 className="font-semibold text-gray-800 mb-4">Recent Messages</h3>
      <div className="flex flex-col max-h-56 overflow-y-scroll no-scrollbar space-y-2">
        {messages.map((message, index) => (
          <Link
            to={`/messages/${message.from_user_id._id}`}
            key={index}
            className={`flex items-start gap-3 py-2 px-3 rounded-xl shadow-sm
              bg-gradient-to-r ${gradients[index % gradients.length]} 
              hover:scale-105 hover:shadow-md transition-transform duration-200`}
          >
            <img
              src={message.from_user_id.profile_picture}
              alt="Profile"
              className="w-8 h-8 rounded-full shadow"
            />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-800">{message.from_user_id.full_name}</p>
                <p className="text-[10px] text-gray-400">
                  {moment(message.createdAt).fromNow()}
                </p>
              </div>
              <div className="flex justify-between items-center mt-0.5">
                <p className="text-gray-600 truncate max-w-[150px]">
                  {message.text ? message.text : "Media"}
                </p>
                {!message.seen && (
                  <p className="bg-indigo-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-semibold">
                    1
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
