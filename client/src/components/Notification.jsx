// import React from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Notification = ({ t, message }) => {
//   const navigate = useNavigate();
//   return (
//     <div
//       className={`max-w-md w-full bg-white shadow-1g rounded-1g flex border border-gray-300 hover: scale-105 transition `}
//     >
//       <div className="flex-1 p-4">
//         <div className="flex items-start">
//           <img
//             src={message.from_user_id.profile_picture}
//             alt=""
//             className="h-10 w-10 rounded-full flex-shrink-0 mt-0.5"
//           />
//           <div className="ml-3 flex-1">
//             <p className="text-sm font-medium text-gray-900">
//               {message.from_user_id.full_name}{" "}
//             </p>
//             <p className="text-sm text-gray-500">
//               {message.text.slice(0, 50)}{" "}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex border-1 border-gray-200">
//         <button
//           onClick={() => {
//             navigate(`/messages/${message.from_user_id._id} `);
//             toast.dismiss(t.id);
//           }}
//           className="p-4 text-indigo-600 font-semibold cursor-pointer"
//         >
//           Reply
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Notification;
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Notification = ({ t, message }) => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-md w-full flex rounded-2xl overflow-hidden
                 bg-gradient-to-r from-[#fdfcfb] via-[#f5ebe0] to-[#ede7f6]
                 shadow-md border border-gray-200 transform transition-all duration-300 ease-in-out
                 hover:scale-105 hover:shadow-lg"
    >
      {/* User Info */}
      <div className="flex-1 p-4">
        <div className="flex items-start">
          <img
            src={message.from_user_id.profile_picture}
            alt=""
            className="h-10 w-10 rounded-full flex-shrink-0 mt-0.5"
          />
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-800">
              {message.from_user_id.full_name}
            </p>
            <p className="text-sm text-gray-600">
              {message.text.slice(0, 50)}
            </p>
          </div>
        </div>
      </div>

      {/* Reply Button */}
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => {
            navigate(`/messages/${message.from_user_id._id}`);
            toast.dismiss(t.id);
          }}
          className="px-4 py-2 m-2 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-[#7fd7d7] via-[#3bbfbf] to-[#2fa6a6]
                     transform transition-all duration-300 ease-in-out
                     hover:scale-105 hover:shadow-md active:scale-95"
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default Notification;
