
// import React from "react";
// import { assets } from "../assets/assets";
// import { Star } from "lucide-react";

// import {SignIn} from "@clerk/clerk-react";


// const Login = () => {
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       <img
//         src={assets.bgImage}
//         alt="Login Background"
//         className="w-full h-full object-cover absolute top-0 left-0 z-[-1]"
//       />

//       {/* left side */}
//       <div className="flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-40">
//         <img src={assets.logo} alt="Logo" className="h-12 object-contain" />

//         <div>
//           <div>
//             <img src={assets.group_users} alt="" className="h-8 md:h-10 " />
//             <div>
//               <div className="flex">
//                 {Array(5)
//                   .fill(0)
//                   .map((_, i) => (
//                     <Star
//                       key={i}
//                       className="size-4 md:size-4.5 text-transparent fill-amber-500"
//                     />
//                   ))}
//               </div>
//               <p className="text-xs md:text-sm text-gray-500">
//                 Join the community of 1000+ users
//               </p>
//             </div>
//           </div>

//           <h1 className="text-3xl md:text-6xl md:pb-2 font-bold bg-gradient-to-r from-indigo-950 to-indigo-800 bg-clip-text text-transparent">
//             Connect with friends and the world around you 
//             on Pingup.
//           </h1>
//           <p className="text-xl md:text-3xl text-indigo-900 max-w-72 md:max-w-md">
//             Share your thoughts, photos, and videos with friends and family.
//           </p>
//         </div>


//         <span className="md:h-10">

//         </span>


//       </div>


//       {/* right side login form */}
//       <div className="flex-1 flex items-center justify-center  p-6 sm:p-10">
//         <SignIn/>

//       </div>
//     </div>
//   );
// };

// export default Login;
import React from "react";
import { assets } from "../assets/assets";
import { Star } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Background Gradient */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[-2]"
        style={{
          background: "linear-gradient(135deg, #fdfcfb 0%, #f5ebe0 50%, #ede7f6 100%)",
        }}
      ></div>

      {/* Faded Background Image */}
      <img
        src={assets.bgImage}
        alt="Login Background"
        className="w-full h-full object-cover absolute top-0 left-0 z-[-1] opacity-10"
      />

      {/* Left Side */}
      <div className="flex-1 flex flex-col items-start justify-between p-6 md:p-12 lg:pl-40">
        {/* Logo */}
        <img
          src={assets.l}
          alt="Logo"
          className="h-16 md:h-20 lg:h-24 w-auto object-contain mb-4 md:mb-0"
        />

        {/* Hero Section */}
        <div className="space-y-6">
          {/* Stars & Info */}
          <div className="flex items-center gap-3">
            <img src={assets.group_users} alt="" className="h-8 md:h-20" />
            <div>
              <div className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-transparent fill-yellow-400"
                    />
                  ))}
              </div>
              <p className="text-xs md:text-sm text-gray-800">
                Join 10,000+ creators and explorers
              </p>
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-3xl md:text-6xl font-extrabold leading-tight
            bg-gradient-to-r from-[#7fd7d7] via-[#3bbfbf] to-[#2fa6a6]
            bg-clip-text text-transparent"
          >
            Discover, Share & Connect on Pingup
          </h1>

          {/* Description */}
          <p className="text-lg md:text-2xl max-w-md text-gray-800">
            Create posts, share moments, and explore content from your friends
            and the community.
          </p>
        </div>

        {/* Spacer */}
        <span className="md:h-10"></span>
      </div>

      {/* Right Side Login Form */}
      <div className="flex justify-center items-center p-6 sm:p-10 w-full md:w-auto">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl shadow-md p-8 md:p-10 flex justify-center items-center">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Login;

