// import React from "react";
// import { assets, dummyUserData } from "../assets/assets";
// import { Link, useNavigate } from "react-router-dom";
// import Menuitem from "./Menuitem";
// import { CirclePlus, LogOut } from "lucide-react";
// import { UserButton, useClerk } from "@clerk/clerk-react";
// import { useSelector } from "react-redux";

// const Sidebar = ({ sidebarOpen, setsidebarOpen }) => {
//   const navigate = useNavigate();
  
//   const user=useSelector((state)=>state.user.value)
//   const { signOut } = useClerk();
//   return (
//     <div
//       className={`w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${
//         sidebarOpen ? "translat-x-0" : "max-sm:-translate-x-full"
//       } transition-all duration-300 ease-in-out`}
//     >
//       <div className="w-full ">
//         <img
//           onClick={() => navigate("/")}
//           src={assets.logo}
//           alt="Logo"
//           className="w-26 ml-7 my-2 cursor-pointer"
//         />
//         <hr className="border-gray-300 mb-8" />

//         <Menuitem setsidebarOpen={setsidebarOpen} />

//         <Link
//           to="/create-post"
//           className="flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white cursor-pointer"
//         >
//           <CirclePlus className=" w-6 h-6" />
//           Create Post
//         </Link>
//       </div>

//       <div className="w-full border-t border-gray-200 p-4 px-7 flex item-center justify-between">
//         <div className="flex gap-2 items-center cursor-pointer">
//           <UserButton />
//           <div>
//             <h1 className="text-sm font-medium">{user.full_name}</h1>
//             <p className="text-xs text-gray-500">@{user.username}</p>
//           </div>
//         </div>
//         <LogOut onClick={() => signOut()} className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import Menuitem from "./Menuitem";
import { CirclePlus, LogOut } from "lucide-react";
import { UserButton, useClerk } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

const Sidebar = ({ sidebarOpen, setsidebarOpen }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const { signOut } = useClerk();

  return (
    <div
      className={`w-60 xl:w-72 bg-gradient-to-b from-[#fdfcfb] via-[#e2d1c3] to-[#c9d6ff]
      text-gray-800 flex flex-col justify-between items-center
      max-sm:absolute top-0 bottom-0 z-20 ${
        sidebarOpen ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out shadow-lg`}
    >
      {/* Logo */}
      <div className="w-full">
        <img
          onClick={() => navigate("/")}
          src={assets.l}
          alt="Logo"
          className="w-60 mx-auto my-6 cursor-pointer drop-shadow-md"
        />
        <hr className="border-gray-400/40 mb-6" />

        {/* Menu Items */}
        <Menuitem setSidebarOpen={setsidebarOpen} />

        {/* Create Post Button */}
        {/* Create Post Button */}
{/* Create Post Button */}
{/* Create Post Button */}
<Link
  to="/create-post"
  className="relative flex items-center justify-center gap-2 py-3 mt-6 mx-6 rounded-2xl
             bg-gradient-to-r from-[#7fd7d7] via-[#3bbfbf] to-[#2fa6a6]
             text-white font-semibold shadow-md
             overflow-hidden group
             transform transition-all duration-500 ease-in-out
             hover:scale-105 hover:shadow-lg active:scale-95"
>
  {/* Shimmer overlay */}
  <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out rounded-2xl"></span>

  {/* Icon */}
  <CirclePlus className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />

  {/* Text */}
  <span className="relative z-10">Create Post</span>
</Link>



      </div>

      {/* User Section */}
      <div className="w-full border-t border-gray-400/40 p-4 px-7 flex items-center justify-between">
        <div className="flex gap-2 items-center cursor-pointer">
          <UserButton />
          <div>
            <h1 className="text-sm font-medium">{user.full_name}</h1>
            <p className="text-xs text-gray-600">@{user.username}</p>
          </div>
        </div>
        <LogOut
          onClick={() => signOut()}
          className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800"
        />
      </div>
    </div>
  );
};

export default Sidebar;
